import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type VideoHTMLAttributes,
} from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import {
  heroActionsVariants,
  heroContainerVariants,
  heroEyebrowVariants,
  heroHeadingVariants,
  heroMediaVariants,
  heroPlayButtonVariants,
  heroSectionRootVariants,
  heroSubheadingVariants,
  heroTextBlockVariants,
  type HeroHeadingSize,
  type HeroLayout,
  type HeroMaxWidth,
  type HeroMediaShadow,
  type HeroPadding,
} from "./HeroSection.variants";

// ─── Context (signal store for media play state) ──────────────────────────────

interface HeroContextValue {
  layout: HeroLayout;
  headingSize: HeroHeadingSize;
  /** Signal: whether the media video is playing */
  isPlaying: ReturnType<typeof useSignal<boolean>>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const HeroContext = createContext<HeroContextValue | null>(null);

function useHeroContext(component: string): HeroContextValue {
  const ctx = useContext(HeroContext);
  if (!ctx) {
    throw new Error(
      `<HeroSection.${component}> must be rendered inside <HeroSection.Root>.`,
    );
  }
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface HeroSectionRootProps extends HTMLAttributes<HTMLElement> {
  /** Visual layout of text vs media. @default "centered" */
  layout?: HeroLayout;
  /** Vertical padding of the section. @default "lg" */
  padding?: HeroPadding;
  /** Max-width of the inner container. @default "lg" */
  maxWidth?: HeroMaxWidth;
  /** Heading and subheading size scale. @default "md" */
  headingSize?: HeroHeadingSize;
  children: ReactNode;
}

function HeroSectionRoot({
  layout = "centered",
  padding = "lg",
  maxWidth = "lg",
  headingSize = "md",
  className,
  children,
  ...props
}: HeroSectionRootProps) {
  useSignals();
  const isPlaying = useSignal(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <HeroContext.Provider value={{ layout, headingSize, isPlaying, videoRef }}>
      <section
        className={cn(heroSectionRootVariants({ padding }), className)}
        {...props}
      >
        <div className={cn(heroContainerVariants({ maxWidth, layout }))}>
          {children}
        </div>
      </section>
    </HeroContext.Provider>
  );
}

HeroSectionRoot.displayName = "HeroSection.Root";

// ─── Text block (groups eyebrow + heading + subheading + actions) ─────────────

export interface HeroSectionTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function HeroSectionText({
  className,
  children,
  ...props
}: HeroSectionTextProps) {
  const { layout } = useHeroContext("Text");
  return (
    <div
      className={cn(heroTextBlockVariants({ layout }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

HeroSectionText.displayName = "HeroSection.Text";

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

export interface HeroSectionEyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

function HeroSectionEyebrow({
  className,
  children,
  ...props
}: HeroSectionEyebrowProps) {
  return (
    <p className={cn(heroEyebrowVariants(), className)} {...props}>
      {children}
    </p>
  );
}

HeroSectionEyebrow.displayName = "HeroSection.Eyebrow";

// ─── Heading ──────────────────────────────────────────────────────────────────

export interface HeroSectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level. @default "h1" */
  as?: "h1" | "h2";
  children: ReactNode;
}

function HeroSectionHeading({
  as: Tag = "h1",
  className,
  children,
  ...props
}: HeroSectionHeadingProps) {
  const { headingSize } = useHeroContext("Heading");
  return (
    <Tag
      className={cn(heroHeadingVariants({ size: headingSize }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

HeroSectionHeading.displayName = "HeroSection.Heading";

// ─── Subheading ───────────────────────────────────────────────────────────────

export interface HeroSectionSubheadingProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

function HeroSectionSubheading({
  className,
  children,
  ...props
}: HeroSectionSubheadingProps) {
  const { headingSize } = useHeroContext("Subheading");
  return (
    <p
      className={cn(heroSubheadingVariants({ size: headingSize }), className)}
      {...props}
    >
      {children}
    </p>
  );
}

HeroSectionSubheading.displayName = "HeroSection.Subheading";

// ─── Actions ──────────────────────────────────────────────────────────────────

export interface HeroSectionActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function HeroSectionActions({
  className,
  children,
  ...props
}: HeroSectionActionsProps) {
  const { layout } = useHeroContext("Actions");
  return (
    <div className={cn(heroActionsVariants({ layout }), className)} {...props}>
      {children}
    </div>
  );
}

HeroSectionActions.displayName = "HeroSection.Actions";

// ─── Media ────────────────────────────────────────────────────────────────────

export interface HeroSectionMediaProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: HeroMediaShadow;
  children: ReactNode;
}

function HeroSectionMedia({
  shadow = "md",
  className,
  children,
  ...props
}: HeroSectionMediaProps) {
  const { layout } = useHeroContext("Media");
  return (
    <div
      className={cn(heroMediaVariants({ layout, shadow }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

HeroSectionMedia.displayName = "HeroSection.Media";

// ─── Video ────────────────────────────────────────────────────────────────────

export interface HeroSectionVideoProps extends Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "controls"
> {
  /** Accessible label for the play/pause button. */
  playLabel?: string;
  pauseLabel?: string;
  /**
   * URL of a WebVTT captions file (required for WCAG 1.2.2).
   * Use a data URI for demos: `"data:text/vtt,WEBVTT"`
   */
  captionsSrc: string;
  /** BCP-47 language code for the captions track. @default "en" */
  captionsSrcLang?: string;
  /** Human-readable label for the captions track. @default "Captions" */
  captionsLabel?: string;
}

function HeroSectionVideo({
  playLabel = "Play video",
  pauseLabel = "Pause video",
  captionsSrc,
  captionsSrcLang = "en",
  captionsLabel = "Captions",
  className,
  src,
  poster,
  ...props
}: HeroSectionVideoProps) {
  useSignals();
  const { isPlaying, videoRef } = useHeroContext("Video");

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying.value) {
      video.pause();
    } else {
      void video.play();
    }
    isPlaying.value = !isPlaying.value;
  }, [isPlaying, videoRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <div className="relative size-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        className={cn("size-full object-cover", className)}
        onPlay={() => {
          isPlaying.value = true;
        }}
        onPause={() => {
          isPlaying.value = false;
        }}
        {...props}
      >
        <track
          kind="captions"
          src={captionsSrc}
          srcLang={captionsSrcLang}
          label={captionsLabel}
          default
        />
      </video>
      <button
        type="button"
        aria-label={isPlaying.value ? pauseLabel : playLabel}
        aria-pressed={isPlaying.value}
        className={cn(heroPlayButtonVariants())}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        {isPlaying.value ? (
          // Pause icon
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-10 w-3 rounded-sm bg-white" />
            <span className="h-10 w-3 rounded-sm bg-white" />
          </span>
        ) : (
          // Play icon (triangle)
          <span
            aria-hidden="true"
            className="ml-2 border-y-[20px] border-l-[36px] border-y-transparent border-l-white"
          />
        )}
      </button>
    </div>
  );
}

HeroSectionVideo.displayName = "HeroSection.Video";

// ─── Image (simple slot without play controls) ────────────────────────────────

export interface HeroSectionImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

function HeroSectionImage({
  src,
  alt,
  className,
  ...props
}: HeroSectionImageProps) {
  return (
    <div className={cn("size-full", className)} {...props}>
      <img src={src} alt={alt} className="size-full object-cover" />
    </div>
  );
}

HeroSectionImage.displayName = "HeroSection.Image";

// ─── Namespace export ─────────────────────────────────────────────────────────

export const HeroSection = {
  Root: HeroSectionRoot,
  Text: HeroSectionText,
  Eyebrow: HeroSectionEyebrow,
  Heading: HeroSectionHeading,
  Subheading: HeroSectionSubheading,
  Actions: HeroSectionActions,
  Media: HeroSectionMedia,
  Video: HeroSectionVideo,
  Image: HeroSectionImage,
};
