import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core'
import Moment from 'react-moment';


const ArchiveCard = (props) => {
    return (
        <div className='card'>
            <Accordion style={{width: '100%'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Moment format="MM/DD/YYYY">
                        <h1>{props.data.date}</h1>
                    </Moment>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container justify='center' spacing={4}>
                        {props.data.movies.map(movie => {
                            return (
                                <Grid item key={movie.title}>
                                    <div className="card">
                                        {movie.poster 
                                        ? <img src={`https://image.tmdb.org/t/p/original/${movie.poster}`} alt="poster" width="100px" />
                                        : <h3>{movie.title}</h3>
                                    }
                                        <h6>Released: <Moment format="YYYY">{movie.release}</Moment></h6>
                                        <h4>Ranking: {movie.ranking}/{props.data.movies.length}</h4>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ArchiveCard
