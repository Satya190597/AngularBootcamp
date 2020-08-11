import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  /**
   * Signup Method.
   * @param email 
   * @param password 
   */
  signUp(email:string,password:string) {
    return this.auth.auth.createUserWithEmailAndPassword(email,password)
  }

  /**
   * Signin Method.
   * @param email
   * @param password 
   */
  signIn(email:string,password:string) {
    return this.auth.auth.signInWithEmailAndPassword(email,password)
  }

  /**
   * Get current auth state.
   */
  getUser() {
    return this.auth.authState
  }

  /**
   * Perform sign-out operation.
   */
  logOut() {
    return this.auth.auth.signOut()
  }
}
