import { useBarSignal } from "../../context/BarSignalContext";
import NotificationBar from "./NotificationBar";

const CoopNotificationBar = () => {
  const { message, isVisible } = useBarSignal();
  return (
    <div>
      <NotificationBar message={message} isVisible={isVisible} />
    </div>
  );
};

export default CoopNotificationBar;
