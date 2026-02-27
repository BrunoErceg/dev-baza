"use client";
import { UserRoundX } from "lucide-react";

import { useCandidateSearch } from "@features/messages/hooks/use-candidate-search";

import { EmptyState } from "@ui/empty-state";
import { FormInput } from "@ui/form-input";

import { Candidate } from "./candidate";
import { CandidatesListSkeleton } from "./candidates-list-skeleton";

export function CandidateSearch() {
  const { users, isLoading, register } = useCandidateSearch();

  return (
    <>
      <FormInput
        {...register("username")}
        placeholder="Unesite korisničko ime..."
      />
      <div className="min-h-65">
        {isLoading ? (
          <CandidatesListSkeleton />
        ) : users.length === 0 ? (
          <EmptyState
            Icon={UserRoundX}
            title="Korisnik nije pronađen"
            description="Provjerite jeste li točno upisali korisničko ime."
          />
        ) : (
          <ul className="mt-2 flex w-full flex-col">
            {users.map((user) => (
              <Candidate key={user.id} user={user} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
