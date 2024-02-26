import type { StatusType } from "data";
import { SVGProps } from "react";
import { CheckmarkIcon } from "../components/icons/Checkmark";
import { ErrorIcon } from "../components/icons/Error";
import { QuestionIcon } from "../components/icons/Question";
import { WarningIcon } from "../components/icons/Warning";

type Props = {
  status: StatusType;
};

export const StatusIcon = ({
  status,
  ...rest
}: Props & SVGProps<SVGSVGElement>) => {
  switch (status) {
    case "operational":
      return (
        <CheckmarkIcon
          {...rest}
          className={[
            rest.className,
            "text-green-500 rgba(34,197,94,0.1)",
          ].join(" ")}
        />
      );
    case "maintenance":
    case "degraded":
      return (
        <WarningIcon
          {...rest}
          className={[
            rest.className,
            "text-yellow-500 rgba(234,179,8,0.1)",
          ].join(" ")}
        />
      );
    case "outage":
      return (
        <ErrorIcon
          {...rest}
          className={[rest.className, "text-red-500 rgba(239,68,68,0.1)"].join(
            " "
          )}
        />
      );
    case "unknown":
      return (
        <QuestionIcon
          {...rest}
          className={[
            rest.className,
            "text-purple-500 rgba(168,85,247,0.1)",
          ].join(" ")}
        />
      );
    default:
      return (
        <QuestionIcon
          {...rest}
          className={[
            rest.className,
            "text-purple-500 rgba(168,85,247,0.1)",
          ].join(" ")}
        />
      );
  }
};
