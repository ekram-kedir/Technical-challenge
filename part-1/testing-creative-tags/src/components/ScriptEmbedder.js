import React, { useEffect, useRef } from 'react';

const ScriptEmbedder = ({ scriptId, src, data }) => {
  const scriptRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = src;

    document.body.appendChild(script);

    scriptRef.current = script;

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [scriptId, src]);


  const htmlContent = `
    <script id="${scriptId}" src="${src}">
      ${JSON.stringify(data)}
    </script>
  `;

  return <div style={{ left:"0" ,position: 'relative' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ScriptEmbedder;
