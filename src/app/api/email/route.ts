import { StripeWelcomeEmail } from '@/emails/stripe-welcome';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'KodeInspire <contact@abiolafasanya.com>',
      to: ['habiolafasanya@gmail.com'],
      subject: 'Welcome Abiola',
      react: StripeWelcomeEmail(),
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
