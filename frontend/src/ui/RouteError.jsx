import styled from "styled-components";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  padding: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 3rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 12px 40px ${({ theme }) => theme.boxShadow};
`;

const IconWrap = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accentSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    color: ${({ theme }) => theme.primary};
  }
`;

const Status = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.75rem;
`;

const Message = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.mutedText};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.88;
  }
`;

const PrimaryBtn = styled(Btn)`
  background: ${({ theme }) => theme.primary};
  color: #fff;
`;

const OutlineBtn = styled(Btn)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

const getErrorContent = (error) => {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404)
      return {
        status: "404",
        title: "Page not found",
        message: "The page you're looking for doesn't exist or has been moved.",
      };
    if (error.status === 401)
      return {
        status: "401",
        title: "Unauthorized",
        message: "You need to be logged in to access this page.",
      };
    if (error.status === 403)
      return {
        status: "403",
        title: "Access denied",
        message: "You don't have permission to view this page.",
      };
    return {
      status: String(error.status),
      title: error.statusText || "Something went wrong",
      message: error.data?.message || "An unexpected error occurred.",
    };
  }

  return {
    status: "Error",
    title: "Unexpected error",
    message: error?.message || "Something went wrong. Please try again.",
  };
};

const RouteError = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const { status, title, message } = getErrorContent(error);

  return (
    <Wrap>
      <Card>
        <IconWrap>
          <FiAlertTriangle size={28} />
        </IconWrap>
        <Status>{status}</Status>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <BtnRow>
          <OutlineBtn onClick={() => navigate(-1)}>
            <FiRefreshCw size={15} /> Go back
          </OutlineBtn>
          <PrimaryBtn onClick={() => navigate("/")}>
            <FiHome size={15} /> Home
          </PrimaryBtn>
        </BtnRow>
      </Card>
    </Wrap>
  );
};

export default RouteError;
