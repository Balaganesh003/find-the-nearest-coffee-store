import React, { useState } from 'react';
import styles from '../styles/auth.module.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import app from '../utils/firebase';
import { useRouter } from 'next/router';
import { authActions } from '../store/auth-slice';
import { useDispatch } from 'react-redux';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const firebaseAuth = getAuth(app);

  const setUser = (user) => {
    dispatch(authActions.setUser(user));
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    try {
      const {
        user: { providerData },
      } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(firebaseAuth.currentUser, { displayName: username });
      setUser(providerData[0]);
      setEmail('');
      setPassword('');
      setUsername('');

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      const {
        user: { providerData },
      } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      setEmail('');
      setPassword('');
      setUser(providerData[0]);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
        <div className={styles.square}></div>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2>{isSignup ? 'Signup Form' : 'Login Form'}</h2>
            <form>
              {isSignup && (
                <>
                  <div className={styles.input__box}>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Username"
                      value={username}
                    />
                  </div>
                </>
              )}
              <div className={styles.input__box}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input__box}>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
              </div>

              {isSignup ? (
                <div
                  onClick={(e) => signUpWithEmail(e)}
                  className={styles.input__box}>
                  <input type="submit" value="SignUp" />
                </div>
              ) : (
                <div
                  onClick={(e) => signInWithEmail(e)}
                  className={styles.input__box}>
                  <input type="submit" value="Login" />
                </div>
              )}

              <p className={styles.forget}>
                {isSignup ? 'Have an account? ' : 'Dont have an account?'}

                <a onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? 'Login' : 'Sign up'}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
