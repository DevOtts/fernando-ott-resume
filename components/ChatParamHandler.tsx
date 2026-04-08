"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface ChatParamHandlerProps {
  onSkipVoice: () => void;
}

export function ChatParamHandler({ onSkipVoice }: ChatParamHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("chat") !== null) {
      onSkipVoice();
    }
  }, [searchParams, onSkipVoice]);

  return null;
}
