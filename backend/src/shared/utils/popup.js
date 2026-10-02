export const sendPopupResponse = (res, payload) => {
  return res.send(`
    <script>
      if (window.opener) {
        window.opener.postMessage(${JSON.stringify(payload)}, '*');
      }
      window.close();
    </script>
  `);
};
