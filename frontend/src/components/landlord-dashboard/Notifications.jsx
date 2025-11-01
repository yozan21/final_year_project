import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiBell,
  FiMessageSquare,
  FiStar,
  FiHome,
  FiEye,
  FiTrash2,
  FiCheck,
  FiX,
  FiBriefcase,
} from "react-icons/fi";
import { mockNotifications } from "../../data/mockData";
import { formatSmartDate } from "../../utils/formatSmartDate";

const NotificationsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  margin: 0;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.surface};
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const FilterTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ active, theme }) =>
    active ? theme.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "white" : theme.text)};

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.primary : theme.background};
  }
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &.unread {
    border-left: 4px solid ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}05`};
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NotificationIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;

  &.booking {
    background: ${({ theme }) => `${theme.primary}20`};
    color: ${({ theme }) => theme.primary};
  }

  &.view {
    background: #dbeafe;
    color: #3b82f6;
  }

  &.system {
    background: #f3f4f6;
    color: #6b7280;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.5rem 0;
`;

const NotificationText = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
`;

const NotificationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationTime = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedText};
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &.primary {
    background: ${({ theme }) => theme.primary};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.accent};
    }
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.mutedText};

    &:hover {
      background: ${({ theme }) => theme.background};
    }
  }

  &.success {
    background: #10b981;
    color: white;

    &:hover {
      background: #059669;
    }
  }

  &.danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.mutedText};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin: 0;
`;

const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary}10;
  }
`;

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filters = [
    { id: "all", label: "All" },
    { id: "view", label: "Views" },
    { id: "booking", label: "Bookings" },
    { id: "system", label: "System" },
  ];

  const filteredNotifications = notifications.filter(
    (notification) =>
      activeFilter === "all" || notification.type === activeFilter
  );

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, seen: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, seen: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleAction = (notification, action) => {
    switch (action) {
      case "read":
        markAsRead(notification.id);
        break;
      case "delete":
        deleteNotification(notification.id);
        break;
      case "booking":
        console.log("View Booking:", notification.title);
        break;
      case "view":
        console.log("View:", notification.title);
        break;
      default:
        break;
    }
  };

  const getNotificationActions = (notification) => {
    switch (notification.type) {
      case "booking":
        return [
          { label: "View Booking", action: "booking", className: "primary" },
          { label: "Mark Read", action: "read", className: "secondary" },
        ];
      case "view":
        return [
          { label: "View Listing", action: "view", className: "primary" },
          { label: "Mark Read", action: "read", className: "secondary" },
        ];
      default:
        return [{ label: "Mark Read", action: "read", className: "secondary" }];
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "system":
        return <FiHome />;
      case "view":
        return <FiEye />;
      case "booking":
        return <FiBriefcase />;
      default:
        return <FiBell />;
    }
  };

  return (
    <NotificationsContainer>
      <PageHeader>
        <PageTitle>Notifications</PageTitle>
        <PageSubtitle>
          Stay updated with your property activities and tenant interactions.
        </PageSubtitle>
      </PageHeader>

      <FilterTabs>
        {filters.map((filter) => (
          <FilterTab
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>

      {unreadCount > 0 && (
        <div style={{ marginBottom: "1rem", textAlign: "right" }}>
          <MarkAllReadButton onClick={markAllAsRead}>
            Mark all as read
          </MarkAllReadButton>
        </div>
      )}

      {filteredNotifications.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🔔</EmptyIcon>
          <EmptyTitle>No notifications</EmptyTitle>
          <EmptyText>
            {activeFilter === "all"
              ? "You're all caught up! No new notifications."
              : `No ${activeFilter} notifications at the moment.`}
          </EmptyText>
        </EmptyState>
      ) : (
        <NotificationsList>
          {filteredNotifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              className={notification.seen ? "" : "unread"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleAction(notification, "read")}
            >
              <NotificationHeader>
                <NotificationIcon className={notification.type}>
                  {getNotificationIcon(notification.type)}
                </NotificationIcon>
                <NotificationContent>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationText>{notification.message}</NotificationText>
                  <NotificationMeta>
                    <NotificationTime>
                      {formatSmartDate(notification.createdAt)}
                    </NotificationTime>
                    <NotificationActions>
                      {getNotificationActions(notification).map((action) => (
                        <ActionButton
                          key={action.action}
                          className={action.className}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(notification, action.action);
                          }}
                        >
                          {action.label}
                        </ActionButton>
                      ))}
                      <ActionButton
                        className="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(notification, "delete");
                        }}
                      >
                        <FiTrash2 />
                      </ActionButton>
                    </NotificationActions>
                  </NotificationMeta>
                </NotificationContent>
              </NotificationHeader>
            </NotificationItem>
          ))}
        </NotificationsList>
      )}
    </NotificationsContainer>
  );
};

export default Notifications;
