import {FormGroup, AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms'
import {AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { debounceTime,take,map } from 'rxjs/operators';

export class CustomValidator {
    static emailUnavailable(db:AngularFireDatabase) : AsyncValidatorFn {
        return (control:AbstractControl) : Observable<ValidationErrors|null> => {
            const email = control.value;
            return db.list('/users',ref => ref.orderByChild('email').equalTo(email))
            .valueChanges()
            .pipe(
                // Delay for few time.
                debounceTime(500),
                // Take only one iteration and then unsubscribe the observable.
                take(1),
                map((response) => {
                    return response.length>0 ? {emailUnavailable:true} : null;
                })
            )
        }
    }
    static instaIdUnavailable(db:AngularFireDatabase) : AsyncValidatorFn {
        return (control: AbstractControl) : Observable<ValidationErrors|null> => {
            const instaId = control.value;
            return db.list('/users',ref => ref.orderByChild('instaId').equalTo(instaId))
            .valueChanges()
            .pipe(
                 // Delay for few time.
                debounceTime(500),
                // Take only one iteration and then unsubscribe the observable.
                take(1),
                map((response) => {
                    return response.length>0 ? {instaIdUnavailable:true} : null;
                })
            )
        }
    } 
}