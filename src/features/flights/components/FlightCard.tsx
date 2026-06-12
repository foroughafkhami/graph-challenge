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
    <div className="relative">
      <div className="relative perspective-[2200px]">
        {/* Card A — stays in place at the top; revealed once Card B folds away. */}
        <CardSurface id={detailsId}>
          <ClassRibbon label={classLabel} />
          <OpenSummary flight={flight} price={price} />
        </CardSurface>

        {/* Card B — overlays Card A and folds down from its bottom edge on open:
            its front face (ClosedSummary) rotates out as the back face
            (FlightDetails) settles below Card A. Purely visual; the button below
            is the click target. */}
        <div
          aria-hidden
          className={cn(
            `pointer-events-none absolute inset-0 origin-bottom transition-transform duration-600
            ease-out transform-3d motion-reduce:transition-none`,
            open ? '-rotate-x-180' : 'rotate-x-0'
          )}
        >
          <CardSurface className="absolute inset-0 pb-8 backface-hidden">
            <ClassRibbon label={classLabel} />
            <ClosedSummary flight={flight} price={price} />
          </CardSurface>
          <CardSurface
            className="absolute inset-0 rotate-x-180 border-t border-dashed backface-hidden"
          >
            <FlightDetails flight={flight} />
          </CardSurface>
        </div>
      </div>

      {/* Reflow space for the folded-down panel — collapses to 0 while closed and
          opens to exactly one card's height (an invisible clone guarantees the
          match) so the page makes room below Card A. */}
      <div
        aria-hidden
        className={cn(
          'grid transition-[grid-template-rows] duration-600 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="invisible overflow-hidden">
          <CardSurface>
            <OpenSummary flight={flight} price={price} />
          </CardSurface>
        </div>
      </div>

      {/* Full area occupied with a button, this causes so many problems but for ACCESSIBILITY AND TAB CONTROL, we do this. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={detailsId}
        aria-label={`${open ? 'Hide' : 'Show'} details for ${src.airline} flight from ${src.country} to ${dst.country}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl outline-none
          focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </div>
  );
}

function CardSurface({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        `relative overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm
        ring-foreground/10`,
        className
      )}
      {...props}
    />
  );
}

function ClassRibbon({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute top-0 left-0 size-24 overflow-hidden">
      <span
        className="absolute top-6 -left-8 w-32 -rotate-45 bg-destructive py-1 text-center
          text-[0.625rem] font-semibold tracking-wider text-white uppercase shadow-sm sm:text-xs"
      >
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
        className="h-8 w-auto select-none sm:h-10"
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
          className="absolute top-0 left-0 size-1.5 animate-dot-trail rounded-full
            bg-muted-foreground/60 motion-reduce:animate-none"
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
        `inline-block rounded-lg px-4 text-base font-bold text-foreground sm:px-6 sm:py-1.5
        sm:text-lg`,
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
    <div className={cn('pb flex flex-col gap-4 px-4 pt-6', className)}>
      <div className="flex items-center justify-between gap-3 pl-10 sm:gap-4 sm:pl-16">
        <Airline className="absolute bottom-2 left-2 sm:static" flight={flight} />

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
    <div className={cn('flex w-20 items-center gap-2 sm:w-32', className)}>
      {logoSrc ? <img src={logoSrc} alt="" aria-hidden /> : null}
    </div>
  );
}

function Endpoint({ label, time, date }: { label: string; time: string; date: string }) {
  return (
    <div className="w-full max-w-40 text-center">
      <div className="text-xs text-ellipsis whitespace-nowrap text-muted-foreground sm:text-sm">
        {label}
      </div>
      <div className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">{time}</div>
      <div className="text-xs text-muted-foreground sm:text-sm">{date}</div>
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
    <div className={cn('grid grid-cols-[1fr_auto_1fr] items-start gap-3 p-8 sm:p-10', className)}>
      <Terminal direction="From" iso3={src.iso3} place={src.country} />

      <div className="flex h-full flex-col items-center justify-center">
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
      <div className="text-xs font-semibold text-primary sm:text-sm">{direction}</div>
      <div className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{iso3}</div>
      <div className="text-xs leading-snug text-muted-foreground sm:text-sm">{place}</div>
    </div>
  );
}

/** Expanded bottom */
function FlightDetails({ flight, className }: { flight: Flight; className?: string }) {
  const { src, dst } = flight;
  const flightTime = `${formatClock(src.time)} - ${formatClock(dst.time)}`;

  return (
    <div className={cn('p-4 sm:p-6', className)}>
      <dl className="grid grid-cols-[2fr_2fr_1fr] gap-3 sm:gap-4">
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
      <dt className="text-lg leading-tight font-bold tracking-tight sm:text-2xl">{value}</dt>
      <dd className="text-xs text-muted-foreground sm:text-sm">{label}</dd>
    </div>
  );
}
