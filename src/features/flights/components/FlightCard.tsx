import { useId, useState, type ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import type { Flight } from '@/features/flights/types';
import { formatBoarding, formatClock, formatDate, formatDuration } from '@/features/flights/utils';

const PLANE_SRC = '/airplane.png';

type FlightCardProps = {
  flight: Flight;
};

export function FlightCard({ flight }: FlightCardProps) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  const { src, dst } = flight;
  const classLabel = flight.class === 'business' ? 'Business' : 'Economy';
  const price = `$${flight.price}`;

  return (
    <div>
      <div className="relative perspective-[2200px]">
        {/* Card A — stays in place at the top; revealed once Card B folds away. */}
        <CardSurface id={detailsId}>
          <ClassRibbon label={classLabel} />
          <OpenSummary flight={flight} price={price} />
        </CardSurface>

        {/* Card B — overlays Card A exactly. Hinged at its bottom edge, it folds
            down on open: front (ClosedSummary) rotates out of view as the back
            (FlightDetails) settles below Card A. */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={detailsId}
          aria-label={`${open ? 'Hide' : 'Show'} details for ${src.airline} flight from ${src.country} to ${dst.country}`}
          className={cn(
            'absolute inset-0 origin-bottom cursor-pointer rounded-2xl outline-none transition-transform duration-600 ease-out transform-3d [-webkit-transform-style:preserve-3d] focus-visible:ring-3 focus-visible:ring-ring/50',
            open ? 'transform-[rotateX(-180deg)]' : 'transform-[rotateX(0deg)]'
          )}
        >
          <CardSurface className="absolute inset-0 text-left [-webkit-backface-visibility:hidden]">
            <ClassRibbon label={classLabel} />
            <ClosedSummary flight={flight} price={price} />
          </CardSurface>
          <CardSurface className="absolute border-t border-dashed inset-0 text-left transform-[rotateX(180deg)] [-webkit-backface-visibility:hidden]">
            <FlightDetails flight={flight} />
          </CardSurface>
        </button>
      </div>

      {/* Spacer — collapsed while closed, it opens to exactly one card's height
          (an invisible clone guarantees the match) so the page reflows to make
          room for Card B once it has folded down. */}
      <div
        aria-hidden
        className={cn(
          'grid transition-[grid-template-rows] duration-600 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="invisible overflow-hidden">
          <CardSurface>
            <OpenSummary flight={flight} price={price} />
          </CardSurface>
        </div>
      </div>
    </div>
  );
}

function CardSurface({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm ring-foreground/10',
        className
      )}
      {...props}
    />
  );
}

function ClassRibbon({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 size-24 overflow-hidden">
      <span className="absolute -left-8 top-6 w-32 -rotate-45 bg-destructive py-1 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
        {label}
      </span>
    </div>
  );
}

function Plane({ withDots = false, className }: { withDots?: boolean; className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {withDots && <DotTrail />}
      <img
        src={PLANE_SRC}
        alt=""
        aria-hidden
        className="h-10 w-auto select-none"
        draggable={false}
      />
      {withDots && <DotTrail />}
    </div>
  );
}

function DotTrail() {
  return (
    <div className="relative h-1.5 w-8 overflow-hidden" aria-hidden>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="absolute left-0 top-0 size-1.5 rounded-full bg-muted-foreground/60 [animation:dot-trail_1s_linear_infinite] motion-reduce:animate-none"
          style={{ animationDelay: `${index * 0.5}s` }}
        />
      ))}
    </div>
  );
}

function PriceTag({ price, variant }: { price: string; variant: 'dashed' | 'solid' }) {
  return (
    <span
      className={cn(
        'inline-block rounded-lg px-6 py-1.5 text-lg font-bold text-foreground',
        variant === 'dashed' ? 'border-2 border-dashed border-muted-foreground/40' : 'bg-muted/80'
      )}
    >
      {price}
    </span>
  );
}

/** Compact state: airline · times · destination · price. */
function ClosedSummary({
  flight,
  price,
  className,
}: {
  flight: Flight;
  price: string;
  className?: string;
}) {
  const { src, dst } = flight;

  return (
    <div className={cn('flex flex-col px-6 pb-6 pt-7 gap-4', className)}>
      <div className="flex items-center justify-between gap-4 pl-16">
        <Airline flight={flight} />

        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
          <Endpoint label={src.country} time={formatClock(src.time)} date={formatDate(src.time)} />
          <Plane className="shrink-0" />
          <Endpoint label={dst.country} time={formatClock(dst.time)} date={formatDate(dst.time)} />
        </div>
      </div>

      <div className="flex justify-center">
        <PriceTag price={price} variant="dashed" />
      </div>
    </div>
  );
}

function Airline({ flight, className }: { flight: Flight; className?: string }) {
  const { logoSrc } = flight;
  return (
    <div className={cn('flex items-center gap-2 w-32', className)}>
      {logoSrc ? <img src={logoSrc} alt="" aria-hidden /> : null}
    </div>
  );
}

function Endpoint({ label, time, date }: { label: string; time: string; date: string }) {
  return (
    <div className="text-center max-w-40 w-full">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-bold leading-tight tracking-tight">{time}</div>
      <div className="text-sm text-muted-foreground">{date}</div>
    </div>
  );
}

/** Expanded top */
function OpenSummary({
  flight,
  price,
  className,
}: {
  flight: Flight;
  price: string;
  className?: string;
}) {
  const { src, dst } = flight;

  return (
    <div className={cn('grid grid-cols-[1fr_auto_1fr] items-start gap-3 p-10', className)}>
      <Terminal direction="From" iso3={src.iso3} place={src.country} />

      <div className="flex flex-col items-center justify-center h-full">
        <Plane withDots className="shrink-0" />
        <div className="absolute bottom-1">
          <PriceTag price={price} variant="solid" />
        </div>
      </div>

      <Terminal direction="To" iso3={dst.iso3} place={dst.country} />
    </div>
  );
}

function Terminal({
  direction,
  iso3,
  place,
}: {
  direction: 'From' | 'To';
  iso3: string;
  place: string;
}) {
  return (
    <div className={'text-center'}>
      <div className="text-sm font-semibold text-primary">{direction}</div>
      <div className="text-4xl font-bold leading-tight tracking-tight">{iso3}</div>
      <div className="text-sm leading-snug text-muted-foreground">{place}</div>
    </div>
  );
}

/** Expanded bottom */
function FlightDetails({ flight, className }: { flight: Flight; className?: string }) {
  const { src, dst } = flight;
  const flightTime = `${formatClock(src.time)} - ${formatClock(dst.time)}`;

  return (
    <div className={cn('p-6', className)}>
      <dl className="grid grid-cols-[2fr_2fr_1fr] gap-4">
        <Stat value={flightTime} label="Flight Time" />
        <Stat value={formatDuration(src.time, dst.time)} label="Duration" />
        <Stat value={formatBoarding(src.time, flight.boarding)} label="Boarding" />
        <Stat value={flight.transfer ? 'Yes' : 'No'} label="Transfer" />
        <Stat value={String(flight.gates)} label="Gate" />
        <Stat value={flight.seat} label="Seat" />
      </dl>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold leading-tight tracking-tight">{value}</dt>
      <dd className="text-sm text-muted-foreground">{label}</dd>
    </div>
  );
}
