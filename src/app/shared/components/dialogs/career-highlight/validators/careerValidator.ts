import { AbstractControl, ValidationErrors } from '@angular/forms';

export function careerValidator(
  group: AbstractControl,
): ValidationErrors | null {
  const start = group.get('start')?.value as string | null;
  const end = group.get('end')?.value as string | null;
  const current = group.get('current')?.value as boolean;

  if (current) {
    return null;
  }

  if (!end) {
    return { endRequired: true };
  }

  if (start && end && end < start) {
    return { endBeforeStart: true };
  }

  return null;
}
