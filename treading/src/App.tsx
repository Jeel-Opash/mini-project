import { useState } from "react"

export const App:React.FC=()jsx.Element=>{
  const[themeMode,sethemeMode]=useState<"light" | "dark">("dark");
  const theme =createTheme({
    palette:{
      mode:themeMode,
    },
    typography:{
      fontSize:14,
    },
  });
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div>
        <TextField value="asdfsad"/>
      </div>
    </ThemeProvider>
  )
}