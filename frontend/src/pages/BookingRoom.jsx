import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRoom } from "../components/roomDetails/useRoom";
import BookingHeader from "../components/bookings/BookingHeader";
import BookingSummary from "../components/bookings/BookingSummary";
import BookingForm from "../components/bookings/BookingForm";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import { useNavigate } from "react-router-dom";

const StyledBookingRoom = styled.div`
  padding: 2rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

function BookingRoom() {
  const { id } = useParams();
  const { room, isPending, isError, error } = useRoom(id);
  const navigate = useNavigate();

  //

  if (isPending) return <Spinner />;
  if (isError)
    return <Error message={error?.message || "Failed to load room"} />;

  // removed unused local state

  const handleSubmit = (data) => {
    // Placeholder: integrate backend booking API here
    // For now we just toast success via browser alert to keep scope minimal
    const hasTxn =
      data?.transactionCode && data.transactionCode.trim().length > 0;
    const hasProof =
      data?.paymentScreenshot?.length ||
      data?.paymentScreenshot instanceof File;
    if (!hasTxn || !hasProof) {
      alert("Please provide payment screenshot and transaction code.");
      return;
    }
    alert("Booking submitted! (demo)");
    navigate(-1);
  };

  //

  return (
    <StyledBookingRoom>
      <BookingHeader room={room} />
      <Layout>
        <BookingForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
        <BookingSummary room={room} discount={0} />
      </Layout>
    </StyledBookingRoom>
  );
}

export default BookingRoom;
