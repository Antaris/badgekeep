const TIPS = [
  {
    title: "Head and shoulders only",
    body: "Face the camera. Show the full head and the top of the shoulders. Crop similar to a passport-style photo.",
  },
  {
    title: "Plain, light background",
    body: "Stand in front of a plain wall. Avoid busy patterns, other people, and cars in the shot.",
  },
  {
    title: "No filters or beauty apps",
    body: "Some councils, including Oldham, say they reject photos that have been filtered or edited. Use the ordinary camera app.",
  },
  {
    title: "Recent and true to life",
    body: "Take it now, not years ago. Eyes open, looking at the camera. Neutral expression. Nothing covering the face unless worn for religious or medical reasons.",
  },
  {
    title: "Even daylight",
    body: "Stand facing a window. Avoid heavy shadow, flash glare, and sunglasses. Hats only if they are always worn for religious or medical reasons.",
  },
];

export function PhotoGuide() {
  return (
    <div className="space-y-8">
      <figure className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
            <p className="text-xs font-semibold tracking-wide text-emerald-800 uppercase">Likely to be accepted</p>
            <PhotoFrame good />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Centred face, plain wall, no filter, shoulders visible.
            </figcaption>
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold tracking-wide text-destructive uppercase">Often rejected</p>
            <PhotoFrame good={false} />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Cropped too tight, busy background, or a filtered “beauty” look.
            </figcaption>
          </div>
        </div>
      </figure>
      <ol className="space-y-3">
        {TIPS.map((tip, index) => (
          <li key={tip.title} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium text-foreground">
              <span className="mr-2 text-muted-foreground">{index + 1}.</span>
              {tip.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tip.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PhotoFrame({ good }: { good: boolean }) {
  return (
    <div
      className="relative mt-4 aspect-3/4 w-full max-w-[220px] overflow-hidden rounded-xl border bg-stone-100"
      aria-hidden="true"
    >
      <div className={good ? "absolute inset-0 bg-stone-200" : "absolute inset-0 bg-linear-to-br from-rose-200 via-amber-100 to-sky-200"} />
      {!good ? (
        <div className="absolute inset-x-3 top-6 h-16 rounded-md bg-stone-400/50" />
      ) : null}
      <div className={good ? "absolute top-[18%] left-1/2 size-20 -translate-x-1/2 rounded-full bg-stone-500" : "absolute top-[8%] left-1/2 size-28 -translate-x-1/2 rounded-full bg-stone-600"} />
      <div className={good ? "absolute bottom-0 left-1/2 h-[42%] w-[70%] -translate-x-1/2 rounded-t-[80px] bg-stone-600" : "absolute bottom-0 left-1/2 h-[58%] w-full -translate-x-1/2 bg-stone-700"} />
    </div>
  );
}
