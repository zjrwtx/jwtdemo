import { useState } from "react";

import { requestToGroqAi } from './utils/groq';
import ReactMarkdown from 'react-markdown';
import { TextField, Button, Container, Typography, Box, Paper, CircularProgress, Snackbar, Alert } from "@mui/material";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function NoteNotes() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const ai = await requestToGroqAi(document.getElementById("content").value);
    console.log(ai);
    setData(ai);
    setLoading(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#f5f5f5", p: 3, borderRadius: 2 }}>
      <Box my={4} textAlign="center">
        <Typography variant="h4" color="primary" gutterBottom>
          发文章链接，1分钟内免费出一篇阅读笔记
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          微信公众号：正经人王同学
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="content"
            label="发你的文章链接吧：支持微信公众号等平台"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'loopy加速生成笔记'}
          </Button>
        </Box>
        {data && (
          <Paper elevation={3} sx={{ p: 2, mt: 4, backgroundColor: "#ffffff", position: 'relative' }}>
            <ReactMarkdown>{data}</ReactMarkdown>
            <CopyToClipboard text={data} onCopy={handleCopy}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<ContentCopyIcon />} 
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                复制
              </Button>
            </CopyToClipboard>
          </Paper>
        )}
      </Box>
      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)}>
        <Alert onClose={() => setCopied(false)} severity="success" sx={{ width: '100%' }}>
          已复制!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default NoteNotes;