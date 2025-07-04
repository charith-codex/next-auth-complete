import { CheckCircleIcon } from "lucide-react";
import React from "react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 flex items-center gap-x-2 text-sm text-emerald-500 rounded-md px-4 py-3">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
