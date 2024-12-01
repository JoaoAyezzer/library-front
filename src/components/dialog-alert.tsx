import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export type DialogAlertProps = {
  title: string;
  description: string;
  buttonTrigger: React.ReactNode;
  disabled?: boolean;
  onConfirm: () => void;
};

export default function DialogAlert({
  title,
  description,
  buttonTrigger,
  disabled,
  onConfirm,
}: DialogAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={disabled}>
        {buttonTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
