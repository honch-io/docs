"use client";

import { Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type DocsFeedbackPayload = {
  helpful: boolean;
  message: string;
  title: string;
  url: string;
};

export function DocsFeedback({
  title,
  url,
  onSendAction,
}: {
  title: string;
  url: string;
  onSendAction: (payload: DocsFeedbackPayload) => Promise<void>;
}) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const canSubmit = helpful !== null && !sent;

  return (
    <section className="flex flex-col gap-3 rounded-lg border border-input bg-popover p-4 shadow-xs/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-medium text-sm">Was this page helpful?</h2>
          <p className="text-muted-foreground text-sm">
            Send a quick signal to improve these docs.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            aria-pressed={helpful === true}
            disabled={sent}
            onClick={() => setHelpful(true)}
            size="sm"
            variant={helpful === true ? "default" : "outline"}
          >
            <ThumbsUp />
            Yes
          </Button>
          <Button
            aria-pressed={helpful === false}
            disabled={sent}
            onClick={() => setHelpful(false)}
            size="sm"
            variant={helpful === false ? "default" : "outline"}
          >
            <ThumbsDown />
            No
          </Button>
        </div>
      </div>
      {helpful !== null && !sent ? (
        <div className="flex flex-col gap-2">
          <textarea
            className={cn(
              "min-h-24 resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs/5 outline-none transition-shadow",
              "placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            )}
            maxLength={1000}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Optional feedback"
            value={message}
          />
          <div className="flex justify-end">
            <Button
              disabled={!canSubmit}
              loading={isPending}
              onClick={() => {
                if (helpful === null) {
                  return;
                }

                startTransition(async () => {
                  await onSendAction({
                    helpful,
                    message,
                    title,
                    url,
                  });
                  setSent(true);
                });
              }}
              size="sm"
            >
              <Send />
              Send feedback
            </Button>
          </div>
        </div>
      ) : null}
      {sent ? (
        <p className="text-muted-foreground text-sm">
          Feedback received. Thank you.
        </p>
      ) : null}
    </section>
  );
}
