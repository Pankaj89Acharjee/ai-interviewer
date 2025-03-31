'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK_DAYS = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
export async function signUp(params: SignUpParams) {
    //SignUpParams coming from types>>index.d.ts
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please login.',
            }
        }
        await db.collection('users').doc(uid).set({
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
        });

        return {
            success: true,
            message: 'Account created successfully. Please sign in.',
        }
    } catch (error: string | any) {
        console.log('Error in signUp:', error);

        if (error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email id already exists.',
            }
        }
        return {
            success: false,
            message: 'Something went wrong, failed to create a new account'
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'User not found. Please sign up.',
            }
        }

        // Set session cookie
        await setSesssionCookie(idToken);

        return {
            success: true,
            message: 'Signed in successfully',
        }
    } catch (error) {
        console.log('Error in signIn:', error);
        return {
            success: false,
            message: 'Something went wrong, failed to sign in'
        }
    }
}



export async function setSesssionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK_DAYS });


    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK_DAYS,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })
}


export async function getCurrentUser(): Promise<User | null> {
    // User is coming from types>>index.d.ts    
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value || '';

    if (!sessionCookie) return null;


    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if (!userRecord.exists) return null;


        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User

    } catch (error) {
        console.log('Error in getting user:', error);
        return null;
    }
}


export async function isAuthenticated() {
    const user = await getCurrentUser()

    // Converting a value to be truthy or falsy in Boolean
    return !!user
}

