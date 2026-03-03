import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id: externalId, ...rest }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-describedby={errorId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-text',
            'placeholder:text-text-muted',
            'transition-colors duration-150',
            'focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface',
            error && 'border-error focus:border-error focus:ring-error/20',
            className,
          )}
          {...rest}
        />
        {error && (
          <p id={errorId} className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
export { Input };
export type { InputProps };
