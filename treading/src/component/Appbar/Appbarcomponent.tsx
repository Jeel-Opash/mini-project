
interface Props{
    handledrawerOpen:()=>void;
}
export const Appbarcomponent:React.FC<Props>=():JSX.Element=>{



    return(
        <div>
            <Appbar position='static' variant='elevation'>
                <Toolbar variant="dense"></Toolbar>
                <IconButton color="inherit" onClick={handledrawerOpen} edge="start">
                    <Typography variant="subtitlel" component="div">React Repo Trading App</Typography>
                </IconButton>
            </Appbar>
        </div>
    )
}