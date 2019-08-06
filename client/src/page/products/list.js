import React, { Component } from 'react';
import Layout from '../../component/layout';
import EnhancedTable from '../../component/table';
import { withRouter, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import 'typeface-roboto';


const useStyles  = (theme => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
    },

}));

class ProductList extends Component{ 
    render(){
        //const { classes } = this.props
        return(
            <div>
                <Layout>
                    <Box component="div" mb={4}>
                        <Typography variant="h4" component="h4">
                            <Box component="span" mr={3}>
                            ( icon ) Products List
                            </Box>
                            <Link to="/products/add"><Fab color="primary" aria-label="add"><AddIcon /></Fab></Link>
                        </Typography>
                    </Box>
                    <EnhancedTable />
                </Layout>
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(ProductList))