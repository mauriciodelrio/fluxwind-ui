"use client";

import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import _ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// react-phone-input-2 ships as CommonJS. Vite/Storybook can wrap the default
// export in a module object { default: fn }. Resolve whichever is callable.
type PhoneInputModule = typeof _ReactPhoneInput & {
  default?: typeof _ReactPhoneInput;
};
const ReactPhoneInput: typeof _ReactPhoneInput =
  (_ReactPhoneInput as unknown as PhoneInputModule).default ?? _ReactPhoneInput;
import { cn } from "@/lib/cn";
import {
  phoneInputWrapperVariants,
  type PhoneInputVariants,
} from "./PhoneInput.variants";
import "./PhoneInput.css";

/** Value emitted by `onChange`. */
export interface PhoneValue {
  /** ISO alpha-2 country code (uppercase), e.g. `"CL"`. */
  countryCode: string;
  /** Raw phone digits including dial code, e.g. `"56912345678"`. */
  number: string;
}

export interface PhoneInputProps extends PhoneInputVariants {
  /** Visible label — always required for a11y (rendered as `<label>`). */
  label: string;
  /**
   * Default country for the dial prefix and flag.
   * Accepts ISO alpha-2 code (case-insensitive). Defaults to `"CL"` (Chile).
   */
  defaultCountry?: string;
  /**
   * When `true`, the flag button opens a country selector dropdown.
   * When `false` (default), the flag is decorative and non-interactive.
   */
  showCountrySelector?: boolean;
  /** Controlled phone number value (digits only, including dial code). */
  value?: string;
  /** Called whenever the phone number or country changes. */
  onChange?: (value: PhoneValue) => void;
  /** Helper text rendered below the input. */
  hint?: string;
  /** Error message — triggers invalid state and `aria-describedby`. */
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      defaultCountry = "CL",
      showCountrySelector = false,
      value,
      onChange,
      hint,
      error,
      disabled,
      placeholder,
      id: externalId,
      name,
      className,
      size,
      radius,
      transition,
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    // react-phone-input-2 is a class component that does `inputProps.ref.current = node`
    // internally. In React 19, the forwarded ref is null when no parent provides one,
    // which causes "Cannot set properties of null (setting 'current')".
    // Fix: always pass a stable object ref to inputProps, and expose it imperatively.
    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => {
      const { current } = inputRef;
      if (current === null)
        throw new Error("[PhoneInput] input ref not attached");
      return current;
    });
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    const handleChange = (
      rawValue: string,
      countryData: { countryCode: string },
    ) => {
      onChange?.({
        countryCode: countryData.countryCode.toUpperCase(),
        number: rawValue,
      });
    };

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-fw-foreground)]"
        >
          {label}
        </label>

        <div
          className={cn(
            "fw-phone-input",
            phoneInputWrapperVariants({ size, radius, transition }),
            error &&
              "border-[var(--color-fw-destructive)] focus-within:outline-[var(--color-fw-destructive)]",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          data-disabled={disabled ? "true" : undefined}
        >
          <ReactPhoneInput
            country={defaultCountry.toLowerCase()}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            disableDropdown={!showCountrySelector}
            enableSearch={showCountrySelector}
            placeholder={placeholder}
            containerClass="!w-full !h-full"
            inputClass="!h-full"
            inputProps={{
              id,
              name,
              ref: inputRef,
              "aria-invalid": error ? "true" : undefined,
              "aria-describedby": describedBy,
            }}
          />
        </div>

        {error ? (
          <span
            id={errorId}
            className="text-xs text-[var(--color-fw-destructive-text)]"
          >
            {error}
          </span>
        ) : null}
        {hint ? (
          <span id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </span>
        ) : null}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
