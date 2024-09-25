import React from 'react';
import { Collapse, Tooltip } from '@mui/material';
import { TreeItem2, TreeItem2Props, TreeItem2Label, treeItemClasses } from '@mui/x-tree-view';
import { TransitionProps } from '@mui/material/transitions'  
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import { useSpring, animated } from '@react-spring/web'
import { styled, alpha } from '@mui/material/styles';

// Define a Animation component
const TransitionComponent = (props: TransitionProps) => {
    const style = useSpring({
        to: {
            Opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
};

// Define Label Props
interface CustomLabelProps {
    children: React.ReactNode;
    tooltip?: string;
}

// Define a customized Label component
const CustomLabel = (props: CustomLabelProps) => {
    const { tooltip, ...other} = props;

    return (
        <Tooltip title={tooltip} placement="top-start">
            <TreeItem2Label {...other} />
        </Tooltip>
    );
}

// Extend TreeItem2 Props with labelTooltip
interface CustomTreeItem2Props extends TreeItem2Props {
    labelTooltip?: string;
};

// Define a customized TreeItem2 component
const CustomTreeItem2 = React.forwardRef(
    // Adding the new prop on top of exisitng props
    (props: CustomTreeItem2Props, ref:React.Ref<HTMLLIElement>) => {
        // Split all props into labelTooltip 
        const { labelTooltip, ...other } = props;

        // Include import essential stuffs for the customized TreeItem2 component
        return(
            <TreeItem2
                // include TreeItem2 element reference
                ref={ref}
                // Include all props (Attributes)
                {...other}
                // Include all slots (Customizations)
                slots={{
                    groupTransition: TransitionComponent,
                    expandIcon: AddCircleRoundedIcon,
                    collapseIcon: RemoveCircleRoundedIcon,
                    endIcon: AdjustRoundedIcon,
                    label: CustomLabel,
                    ...props.slots
                }}
                // Include all slots who accept props
                slotProps={{
                    label: { tooltip: labelTooltip } as any
                }}
            />
        );
    },
);

// Define a styled customized TreeItem2 component
const JSONMUITree = styled(CustomTreeItem2)(({ theme }) => ({
    [`& .${treeItemClasses.content}`]: {
        padding: theme.spacing(0.5, 1),
        margin: theme.spacing(0.2, 0),
        justifyContent: 'start',
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
        opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed 
        ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));

export default JSONMUITree;