import { useCallback } from 'react';
import {
  useNavigate,
  useNavigationType,
  useParams,
  useSearchParams,
} from 'react-router-dom';
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
  ButtonGroup,
  Button,
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const GET_INVESTOR_DETAILS = gql`
  query GetInvestorCommitments($assetName: String, $investorId: Int!) {
    investor(id: $investorId) {
      id
      name
    }
    commitments(assetName: $assetName, investorId: $investorId) {
      id
      assetName
      currency
      amount
    }
  }
`;

const GET_ASSET_SUMMARIES = gql`
  query GetAssetSummaries($investorId: Int!) {
    assetSummaries(investorId: $investorId) {
      assetName
      totalAmount
    }
  }
`;

export const InvestorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setAssetFilter = useCallback(
    (filter: string) => {
      setSearchParams({ assetFilter: filter });
    },
    [setSearchParams]
  );
  const assetFilter = searchParams.get('assetFilter') || '';

  const {
    loading: loadingInvestorDetails,
    error: errorInvestorDetails,
    data: dataInvestorDetails,
  } = useQuery(GET_INVESTOR_DETAILS, {
    variables: { assetName: assetFilter, investorId: +id },
  });

  const {
    loading: loadingAssets,
    error: errorAssets,
    data: dataAssets,
  } = useQuery(GET_ASSET_SUMMARIES, {
    variables: { investorId: +id },
  });

  if (loadingInvestorDetails || loadingAssets) return <CircularProgress />;
  if (errorInvestorDetails || errorAssets)
    return (
      <Typography color="error">
        Error: {errorInvestorDetails?.message || errorAssets?.message}
      </Typography>
    );

  const totalAmount = dataAssets.assetSummaries
    .reduce((acc, asset) => acc + asset.totalAmount, 0)
    .toFixed(1);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={() => navigate(`/`)}
      >
        Got to Investors page
      </Button>
      <Typography variant="h4" gutterBottom>
        Commitments for {dataInvestorDetails.investor.name}
      </Typography>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="commitment filters"
        sx={{ marginBottom: 2 }}
      >
        <Button onClick={() => setAssetFilter('')}>
          All £{(totalAmount / 1_000_000_000).toFixed(1)}B
        </Button>
        {dataAssets.assetSummaries.map((asset) => (
          <Button
            key={asset.assetName}
            onClick={() => setAssetFilter(asset.assetName)}
          >
            {asset.assetName} £{(asset.totalAmount / 1_000_000_000).toFixed(1)}B
          </Button>
        ))}
      </ButtonGroup>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Asset Class</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataInvestorDetails.commitments.map((commitment) => (
              <TableRow key={commitment.id}>
                <TableCell>{commitment.id}</TableCell>
                <TableCell>{commitment.assetName}</TableCell>
                <TableCell>{commitment.currency}</TableCell>
                <TableCell>{`${commitment.amount.toFixed(2)}M`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
