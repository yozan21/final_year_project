//
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button } from "../../styles/buttons";

const Form = styled.form`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  border-radius: 12px;
  padding: 1.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.mutedText}80;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const FieldHint = styled.small`
  color: ${({ theme }) => theme.mutedText};
`;

function BookingForm({ onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      transactionCode: "",
    },
  });

  return (
    <Form onSubmit={handleSubmit((data) => onSubmit?.(data))}>
      <Grid>
        <Group>
          <Label>Payment screenshot</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("paymentScreenshot")}
          />
          <FieldHint>Upload a clear image of the payment proof.</FieldHint>
        </Group>

        <Group>
          <Label>Transaction code</Label>
          <Input
            type="text"
            placeholder="e.g., TXN-123456"
            {...register("transactionCode")}
          />
        </Group>
      </Grid>
      <Actions>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <div style={{ width: 8 }} />
        <Button type="submit">Book</Button>
      </Actions>
    </Form>
  );
}

export default BookingForm;
