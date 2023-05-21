import { Box, List, ListItem, ListItemText } from "@mui/material";

export default function Tasks({ items }) {
    return (
        <Box>
            {items.map((item) => {
                return (
                    <List key={item._id}>
                        <ListItem>
                            <ListItemText>
                                {item.subject}
                            </ListItemText>
                        </ListItem>
                    </List>
                );
            })};
        </Box>
    );
}
