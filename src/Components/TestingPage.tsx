import * as React from 'react';
import { Stack, Box, Typography, Collapse } from '@mui/material';
import { SimpleTreeView, TreeItem2, TreeItem2Props, treeItemClasses } from '@mui/x-tree-view';
import { TransitionProps } from '@mui/material/transitions'  
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { useSpring, animated } from '@react-spring/web'
import { styled, alpha } from '@mui/material/styles';

export default function TestingPage() {
    const [lastClickedItem, setLastClickedItem] = React.useState<string | null>(null);
    const [lastSelectedItem, setLastSelectedItem] = React.useState<string | null>(null);
    const [lastExpandItem, setLastExpandItem] = React.useState<string | null>(null);

    const handleItemClick = (
        event: React.SyntheticEvent,
        itemId: string,
    ) => {
        setLastClickedItem(itemId)
    };

    const handleItemSelectionToggle = (
        event: React.SyntheticEvent,
        itemId: string,
        isSelected: boolean,
    ) => {
        if (isSelected) {
            setLastSelectedItem(itemId);
        }
    };

    const handleItemExpansionToggle = (
        event: React.SyntheticEvent, 
        itemId: string, 
        isExpanded: boolean
    ) => {
        if (isExpanded) {
            setLastExpandItem(itemId)
        }
    };

    interface CustomTreeItem2Props extends TreeItem2Props {
        level?: number;
    }

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
    }

    const CustomTreeItem2 = React.forwardRef(
        (props: CustomTreeItem2Props, ref:React.Ref<HTMLLIElement>) => (
            <TreeItem2
                ref={ref}
                {...props}
                slots={{
                    groupTransition: TransitionComponent,
                    expandIcon: AddBoxIcon,
                    collapseIcon: IndeterminateCheckBoxIcon,
                    endIcon: DisabledByDefaultOutlinedIcon,
                    ...props.slots
                }}
            />
        ),
    );

    const StyledCustomTreeItem2 = styled(CustomTreeItem2)(({ theme }) => ({
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

    return (
    <Stack className='TestingPage' spacing={2}>
        <Typography>
            {lastClickedItem == null
                ? 'No item click recorded'
                : `Last clicked item: ${lastClickedItem}`}
        </Typography>

        <Typography>
            {lastSelectedItem == null
                ? 'No item is selected'
                : `Last selected item: ${lastSelectedItem}`}
        </Typography>

        <Typography>
            {lastExpandItem == null
                ? 'No item is expanded'
                : `Last expanded item: ${lastExpandItem}`}
        </Typography>

        <Box sx={{ 
            minHeight: 352, 
            minWidth: 250,
            boxShadow: 3,

            textAlign: 'left',
            fontWeight: 'medium',
            fontSize: 16,
            fontFamily: 'Georgia',
         }}>
            <SimpleTreeView
                multiSelect={true}
                checkboxSelection={true}
                onItemClick={handleItemClick}
                onItemSelectionToggle={handleItemSelectionToggle}
                onItemExpansionToggle={handleItemExpansionToggle}
            >
                <StyledCustomTreeItem2 itemId="grid" label="Data Grid" level={1}>
                    <StyledCustomTreeItem2 itemId="grid-community" label="@mui/x-data-grid" level={2} disabled/>
                    <StyledCustomTreeItem2 itemId="grid-pro" label="@mui/x-data-grid-pro" level={2}/>
                    <StyledCustomTreeItem2 itemId="grid-premium" label="@mui/x-data-grid-premium" level={2}/>
                </StyledCustomTreeItem2>
                <StyledCustomTreeItem2 itemId="pickers" label="Date and Time Pickers" level={1}>
                    <StyledCustomTreeItem2 itemId="pickers-community" label="@mui/x-date-pickers" level={2}>
                        <StyledCustomTreeItem2 itemId="pickers-community-testing" label="TESTING 1" level={3}/>
                    </StyledCustomTreeItem2>
                    <StyledCustomTreeItem2 itemId="pickers-pro" label="@mui/x-date-pickers-pro" level={2} />
                </StyledCustomTreeItem2>
                <StyledCustomTreeItem2 itemId="charts" label="Charts" level={1}>
                    <StyledCustomTreeItem2 itemId="charts-community" label="@mui/x-charts" level={2}/>
                </StyledCustomTreeItem2>
                <StyledCustomTreeItem2 itemId="tree-view" label="Tree View" level={1}>
                    <StyledCustomTreeItem2 itemId="tree-view-community" label="@mui/x-tree-view" level={2}/>
                </StyledCustomTreeItem2>
            </SimpleTreeView>
        </Box>
    </Stack>
    );
    }
