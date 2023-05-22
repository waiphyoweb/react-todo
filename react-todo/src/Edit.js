import { ArrowBack, Save } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = "http://localhost:8000";

export default function Edit({ update }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch(`${api}/tasks/${id}`);
            const task = await res.json();

            setSubject(task.subject);
        })();
    }, []);
    return (
        <Box>
            <Box>
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <ArrowBack />
                </IconButton>
            </Box>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault();

                    update(id, subject);
                    navigate("/");
                }}
            >
                <OutlinedInput
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    fullWidth
                    color="error"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <Save sx={{ color: green[500] }} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Box>
        </Box>
    );
}
