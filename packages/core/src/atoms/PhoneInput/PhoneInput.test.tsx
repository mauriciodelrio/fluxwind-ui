import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { PhoneInput } from "./PhoneInput";

// ─── Mock react-phone-input-2 ────────────────────────────────────────────────
// Avoids flag-sprite CSS and DOM complexity in jsdom while keeping the
// label → input wiring fully testable.
vi.mock("react-phone-input-2", async () => {
  const { forwardRef } = await import("react");

  interface MockProps {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
      ref?: React.Ref<HTMLInputElement>;
    };
    onChange?: (value: string, data: { countryCode: string }) => void;
    country?: string;
    value?: string;
    disabled?: boolean;
    disableDropdown?: boolean;
    enableSearch?: boolean;
    placeholder?: string;
    containerClass?: string;
    inputClass?: string;
  }

  const MockPhoneInput = forwardRef<HTMLInputElement, MockProps>(
    (
      {
        inputProps = {},
        onChange,
        country = "cl",
        value,
        disabled,
        disableDropdown,
        placeholder,
      },
      _ref,
    ) => {
      const { ref: inputRef, ...restInputProps } = inputProps;

      return (
        <div data-testid="rpi2-container">
          {!disableDropdown && (
            <button
              type="button"
              aria-label={`Select country, current: ${country.toUpperCase()}`}
              data-testid="country-selector-btn"
              tabIndex={-1}
            >
              {country.toUpperCase()}
            </button>
          )}
          {disableDropdown ? <span
              aria-hidden="true"
              data-testid="country-display"
              data-country={country.toUpperCase()}
            /> : null}
          <input
            {...restInputProps}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            data-testid="phone-input-inner"
            type="tel"
            value={value ?? ""}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => {
              onChange?.(e.target.value, { countryCode: country });
            }}
          />
        </div>
      );
    },
  );
  MockPhoneInput.displayName = "MockPhoneInput";

  return { default: MockPhoneInput };
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("PhoneInput", () => {
  it("renders label and input", () => {
    render(<PhoneInput label="Phone number" />);
    expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(<PhoneInput label="Mobile" id="mobile-input" />);
    expect(screen.getByLabelText("Mobile")).toHaveAttribute(
      "id",
      "mobile-input",
    );
  });

  it("renders hint text when provided", () => {
    render(<PhoneInput label="Phone" hint="Include country code." />);
    expect(screen.getByText("Include country code.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(<PhoneInput label="Phone" error="Invalid phone number." />);
    expect(screen.getByText("Invalid phone number.")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<PhoneInput label="Phone" error="Required." />);
    expect(screen.getByLabelText("Phone")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<PhoneInput label="Phone" />);
    expect(screen.getByLabelText("Phone")).not.toHaveAttribute("aria-invalid");
  });

  it("links error message via aria-describedby", () => {
    render(<PhoneInput label="Phone" error="Bad number." />);
    const input = screen.getByLabelText("Phone");
    const errorEl = screen.getByText("Bad number.");
    expect(input.getAttribute("aria-describedby")).toContain(errorEl.id);
  });

  it("links hint text via aria-describedby", () => {
    render(<PhoneInput label="Phone" hint="Some hint." />);
    const input = screen.getByLabelText("Phone");
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
  });

  it("defaults to CL country (flag display shown)", () => {
    render(<PhoneInput label="Phone" />);
    const display = screen.getByTestId("country-display");
    expect(display).toHaveAttribute("data-country", "CL");
  });

  it("accepts a custom defaultCountry", () => {
    render(<PhoneInput label="Phone" defaultCountry="US" />);
    const display = screen.getByTestId("country-display");
    expect(display).toHaveAttribute("data-country", "US");
  });

  it("hides country selector button when showCountrySelector=false (default)", () => {
    render(<PhoneInput label="Phone" />);
    expect(
      screen.queryByTestId("country-selector-btn"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("country-display")).toBeInTheDocument();
  });

  it("shows country selector button when showCountrySelector=true", () => {
    render(<PhoneInput label="Phone" showCountrySelector />);
    expect(screen.getByTestId("country-selector-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("country-display")).not.toBeInTheDocument();
  });

  it("calls onChange with { countryCode: ISO uppercase, number } on input", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<PhoneInput label="Phone" defaultCountry="CL" onChange={handler} />);
    const input = screen.getByLabelText("Phone");
    await user.type(input, "9");
    expect(handler).toHaveBeenCalledWith({ countryCode: "CL", number: "9" });
  });

  it("emits countryCode as uppercase ISO code", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<PhoneInput label="Phone" defaultCountry="us" onChange={handler} />);
    const input = screen.getByLabelText("Phone");
    await user.type(input, "5");
    const lastCall = handler.mock.calls[handler.mock.calls.length - 1][0];
    expect(lastCall.countryCode).toBe("US");
  });

  it("is disabled when disabled=true", () => {
    render(<PhoneInput label="Phone" disabled />);
    expect(screen.getByLabelText("Phone")).toBeDisabled();
  });

  it("renders placeholder", () => {
    render(<PhoneInput label="Phone" placeholder="+56 9 XXXX XXXX" />);
    expect(screen.getByPlaceholderText("+56 9 XXXX XXXX")).toBeInTheDocument();
  });

  it("shows both hint and error when both are provided", () => {
    render(
      <PhoneInput label="Phone" hint="Include area code." error="Required." />,
    );
    expect(screen.getByText("Include area code.")).toBeInTheDocument();
    expect(screen.getByText("Required.")).toBeInTheDocument();
  });

  it("has no WCAG violations — default state", async () => {
    const { container } = render(
      <PhoneInput label="Phone number" placeholder="+56 9 XXXX XXXX" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <PhoneInput label="Phone number" error="Invalid phone number." />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with country selector", async () => {
    const { container } = render(
      <PhoneInput label="Phone number" showCountrySelector />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
