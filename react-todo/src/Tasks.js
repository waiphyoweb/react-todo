import { Delete } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Tasks({ items, remove }) {
    return (
        <Box>
            {items.map((item) => {
                return (
                    <List key={item._id}>
                        <ListItem>
                            
                            <ListItemText sx={{ ml: 3, color: item.done ? "grey" : "light"}}>
                                {item.subject}
                            </ListItemText>
                            <IconButton onClick={() => remove(item._id)}>
                                <Delete sx={{ color: red[300]}}/>
                            </IconButton>
                        </ListItem>
                    </List>
                );
            })};
        </Box>
    );
}
