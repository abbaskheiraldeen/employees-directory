import { JSX, useState } from "react";
import DeleteCard from "./DeleteCard";
import { type QueryKey } from "@tanstack/react-query";
import { useDeleteData } from "@/hooks/api-service/useDeleteData";
import { BsFillTrashFill } from "react-icons/bs";

export default function DeleteItem({
  buttonChildren,
  title,
  caption,
  endpoint,
  queryKeysToInvalidate,
  callBackOnSuccess,
}: {
  buttonChildren?: string | JSX.Element;
  title: string;
  caption: string;
  endpoint: string;
  queryKeysToInvalidate: QueryKey[];
  callBackOnSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const mutation = useDeleteData({
    queryKeysToInvalidate,
    endpoint,
    callBackOnSuccess: () => {
      setOpen(false);
      callBackOnSuccess?.();
    },
  });

  return (
    <>
      <button onClick={() => setOpen(true)}>
        {buttonChildren ? (
          buttonChildren
        ) : (
          <BsFillTrashFill size={18} color="red" />
        )}
      </button>

      <DeleteCard
        title={title}
        caption={caption}
        open={open}
        setOpen={setOpen}
        handleConfirm={mutation.mutate}
        handleCancel={() => setOpen(false)}
        isLoading={mutation.isPending}
      />
    </>
  );
}
