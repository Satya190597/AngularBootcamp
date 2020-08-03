import { FormGroup } from '@angular/forms'

// Export Passport Checker Function
export function PasswordChecker(passwordCtrl: string,confirmPasswordCtrl: string) {
	return (formGroup:FormGroup) => {
		const password = formGroup.controls[passwordCtrl];
		const confirmPassword = formGroup.controls[confirmPasswordCtrl];
		if(password.value!=confirmPassword.value) {
			confirmPassword.setErrors({mismatch:true})
		}
		else {
			confirmPassword.setErrors(null);
		}

	}
}
