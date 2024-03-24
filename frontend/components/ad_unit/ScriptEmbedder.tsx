import React, { useEffect, useRef } from 'react';

type ScriptProps = {
  scriptId: string;
  src: string;
  data: any; // Include data prop
};

const ScriptEmbedder: React.FC<ScriptProps> = ({ scriptId, src, data }) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = src;

    document.body.appendChild(script);

    scriptRef.current = script;

    // Cleanup function to remove the script element when unmounting
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [scriptId, src]);

  // Construct HTML content using data prop
  const htmlContent = `
    <script id="${scriptId}" src="${src}">
      ${JSON.stringify(data)}
    </script>
  `;

  // Render an empty div where the script can be embedded
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ScriptEmbedder;
