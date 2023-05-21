import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useRef } from "react";
import { indigo } from "@mui/material/colors";

export default function NewTask({ add }) {
    const input = useRef();

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();

                const subject = input.current.value;
                if (!subject) return false;
                add(subject);

                input.current.value = "";
                input.current.focus();
            }}
        >
            <Box>
                <OutlinedInput
                    fullWidth
                    placeholder="Enter the task"
                    inputRef={input}
                    variant="standard"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <AddIcon sx={{ color: indigo[300] }} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Box>
        </Box>
    );
}
