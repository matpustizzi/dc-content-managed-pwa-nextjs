import React, { PropsWithChildren } from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

const styles = (theme: Theme) => ({
    root: {
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.grey.A400,
        borderBottom: `1px solid ${theme.palette.grey[700]}`,
        color: theme.palette.getContrastText(theme.palette.grey.A400)
    }
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
    className?: string;
    style?: React.CSSProperties;
    description?: string;
}

const PromoBanner: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        children,
        description,
        ...other
    } = props;

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <ReactMarkdown source={description} />
        </div>
    );
};

export default withStyles(styles)(PromoBanner);