import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';

const GET_INVESTORS = gql`
  query GetInvestors {
    investors {
      id
      name
      type
      address
      dateAdded
      totalCommitment
    }
  }
`;

export const InvestorList = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_INVESTORS);

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Total Commitment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.investors.map((investor) => (
            <TableRow
              key={investor.id}
              onClick={() => navigate(`/investors/${investor.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{investor.id}</TableCell>
              <TableCell>{investor.name}</TableCell>
              <TableCell>{investor.type}</TableCell>
              <TableCell>
                {new Date(investor.dateAdded).toLocaleDateString()}
              </TableCell>
              <TableCell>{investor.address}</TableCell>
              <TableCell>{`${(investor.totalCommitment / 1_000_000_000).toFixed(
                1
              )}B`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
