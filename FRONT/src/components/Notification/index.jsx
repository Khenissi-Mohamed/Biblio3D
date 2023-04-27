import { Check, XSquare } from 'react-feather';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification, resetNotificationMessage } from '../../store/reducers/notification';
import { useEffect } from 'react';



function Notification() {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.notification.open);
  const message = useSelector((state) => state.notification.message);


  const handleCloseNotification = () => {
    dispatch(closeNotification());
  };

  const handleTransitionEnd = () => {
    if (!open) {
      dispatch(resetNotificationMessage());
    }
  }
  // close notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleTransitionEnd();
      handleCloseNotification();
    }, 3000);
    return () => clearTimeout(timer);
  }, [open]);


  return (
    <div
      className={`notification ${open ? 'notification active' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className='notification-close-button' onClick={handleCloseNotification}>
        <XSquare className="notification-close-icon" />
        <Check className="notification-check-icon" />

      </div>
      <p className='notification__message'> {message} </p>
    </div >
  )
}

export default Notification