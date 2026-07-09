import { type ValidatorFn, Validators } from '@angular/forms';
import { PHONE_PATTERN } from '@constants/patterns.constants';

export const phoneValidator: ValidatorFn = Validators.pattern(PHONE_PATTERN);
