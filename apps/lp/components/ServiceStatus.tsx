import { statusLabel } from 'data';
import Link from 'next/link';
import styled from 'styled-components';
import { mediaQueries } from '../constants/media';
import { ErrorIcon } from './icons/Error';
import { WarningIcon } from './icons/Warning';

const ServiceStatusContainer = styled(Link)`
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  background-color: white;
  border: 1px solid #277bc0;
  font-size: 0.75rem;
  @media ${mediaQueries.md} {
    font-size: 1rem;
  }
`;

const StatusLabel = styled.div`
  background-color: #277bc0;
  color: white;
  font-weight: bold;
  padding: 6px 12px;
  @media ${mediaQueries.md} {
    padding: 4px 12px;
  }
`;

const ActualStatus = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  @media ${mediaQueries.md} {
    padding: 4px 12px;
  }
`;

const Circle = styled.div`
  border: 4px solid #22c55e;
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;

const ActualStatusLabel = styled.span`
  font-weight: bold;
  margin-left: 6px;
  color: #212121;
  font-weight: bold;
`;

export const ServiceStatus = () => {
  const statusColorMap = {
    operational: '#22c55e',
    partiallyMaintenance: '#eab308',
    maintenance: '#eab308',
    partiallyDegraded: '#eab308',
    degraded: '#eab308',
    outage: '#ef4444',
    unknown: '#ef4444',
  };
  const statusText = {
    operational: '異常なし',
    partiallyMaintenance: '支障あり',
    maintenance: 'メンテナンス中',
    partiallyDegraded: '支障あり',
    degraded: '支障あり',
    outage: '障害発生中',
    unknown: '調査中',
  };
  const StatusIcon = () => {
    switch (statusLabel) {
      case 'operational':
        return <Circle />;
      case 'maintenance':
      case 'partiallyMaintenance':
      case 'degraded':
      case 'partiallyDegraded':
        return <WarningIcon color={statusColorMap['maintenance']} />;
      case 'outage':
        return <ErrorIcon color={statusColorMap['outage']} />;
      case 'unknown':
        return <ErrorIcon color={statusColorMap['unknown']} />;

      default:
        return null;
    }
  };

  return (
    <ServiceStatusContainer
      href="https://status.trainlcd.app"
      rel="noopener noreferrer"
      target="_blank"
    >
      <StatusLabel>障害情報</StatusLabel>
      <ActualStatus>
        <StatusIcon />
        <ActualStatusLabel>{statusText[statusLabel]}</ActualStatusLabel>
      </ActualStatus>
    </ServiceStatusContainer>
  );
};
