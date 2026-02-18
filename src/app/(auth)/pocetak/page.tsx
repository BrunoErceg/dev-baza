"use client";
import Link from "next/link";

import { OnboardingForm } from "@features/auth/components/onboarding-form";

import { H3, Muted } from "@ui/typography";

export default function OnboardingPage() {
  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs space-y-5 text-center">
          <div className="mb-10">
            <H3 className="mb-1">Dobrodošli u Dev Bazu</H3>
            <Muted>
              Odaberi svoje korisničko ime za nastavak na dashboard.
            </Muted>
          </div>
          <OnboardingForm />

          <div className="mt-5">
            <p className="text-center text-sm">
              Nastavkom prijave prihvaćate naše
              <br />
              <Link
                href="/registracija"
                className="text-muted-foreground ml-1 underline"
              >
                Uvjete korištenja
              </Link>
              <Link
                href="/registracija"
                className="text-muted-foreground ml-1 underline"
              >
                Pravila privatnosti
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
