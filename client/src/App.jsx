import { useQuery, gql } from "@apollo/client";
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const GET_ADDRESSES_BY_NAME_QUERY = gql`
query GetAddressesByName($name: String!) {
  getByPartialName(name: $name) {
    name
    phone
  }
}
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_ADDRESSES_BY_NAME_QUERY, {
    variables: { name: "" },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            id="search-input"
            label="Eingabe"
            variant="outlined" type="text"
            onChange={(e) => refetch(
            { name: e.target.value }
            )}
          />

          <Box sx={{ pl: 2 }}>
            <List dense>
              {data?.getByPartialName.map((address, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    {address.name}: {address.phone}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
