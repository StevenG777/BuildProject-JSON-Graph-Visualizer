import React, { useEffect } from 'react';
import { Container, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import JSONMUITree from './JSONMUITree';

// Key Map used by internal component
const keyMap: Record<string, string> = {}

// Helper Function: Generate JSX Rendered Content using RECURSION
/*
Parent Key: The previous key from parent field
Current Key: The current key from iterating the object
Display Key: The processed current key for displaying in the UI
Internal Key: The processed current key that is unique and will be used for internal system
*/
const renderJSON = (
    obj: any,                             // JSON data root
    level: number = 1,                    // JSON hierarchical level
    parentKey: string = "root",           // Parent Key
    isParentArray: boolean = false,       // Check if Parent object is Array
): JSX.Element[] => {
    // Define the element array to be rendered
    const elements: JSX.Element[] = [];

    // Iterate the JSON object
    Object.keys(obj).forEach((currentKey, index) => {
        // --- BEGIN RECURSION ---
        // Set up Important Var
        const value = obj[currentKey];
        let internalKey: string;
        let displayKey: string;
        let type: string;

        // Define type & parent conditionally
        const isArray = Array.isArray(value);
        type = isArray ? 'Array' : typeof value;

        // Define Internal Key and Display Key conditionally
        if (isParentArray) {
            internalKey = `${parentKey}_${index.toString()}`;
            displayKey = `Element ${(index+1).toString()}`;
        } else {
            internalKey = `${parentKey}_${currentKey}`;
            displayKey = currentKey;
        }
        // Store mapping key in the system
        keyMap[internalKey] = displayKey;

        // RECURSIVE BASE: Object Type
        if (typeof value == 'object' && !isArray && value !== null) {
            elements.push(
                <JSONMUITree 
                itemId={internalKey} 
                label={`Key: ${displayKey}, Type: ${type} `}
                labelTooltip={`Level ${level.toString()}`}
                >
                    {renderJSON(value, level + 1, internalKey, false)}
                </JSONMUITree>
            );
        // RECURSIVE BASE: Array Type
        } else if (isArray && value !== null) {
            elements.push(
                <JSONMUITree 
                itemId={internalKey} 
                label={`Key: ${displayKey}, Type: ${type}`}
                labelTooltip={`Level ${level.toString()}`}
                >
                    {renderJSON(value, level + 1, internalKey, true)}
                </JSONMUITree>
            );
        // BASE CASE: Not Object Type
        } else {
            elements.push(
                <JSONMUITree 
                itemId={internalKey} 
                label={`Key: ${displayKey}, Type: ${type}`}
                labelTooltip={`Level ${level.toString()}`}
                />
            );
        }
        // --- END RECURSION ---
    })

    return elements;
}

// Interface for json Data
interface propsInterface {
    jsonData: any;
}

const JSONView: React.FC<propsInterface> = ({ jsonData }: propsInterface): JSX.Element => {
    const [localJsonData, setLocalJsonData] = React.useState<any>(jsonData);
    const [lastSelectedItem, setLastSelectedItem] = React.useState<string | null>(null);
    const [lastExpandItem, setLastExpandItem] = React.useState<string | null>(null);
    const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

    useEffect(() => {
        setLocalJsonData(jsonData);
    }, [jsonData])

    // When item toggle is selected
    const handleItemSelectionToggle = (
        event: React.SyntheticEvent,
        itemId: string,
        isSelected: boolean,
    ) => {
        if (isSelected) {
            setLastSelectedItem(itemId);
        }
    };

    // When item is expanded
    const handleItemExpansionToggle = (
        event: React.SyntheticEvent, 
        itemId: string, 
        isExpanded: boolean
    ) => {
        if (isExpanded) {
            setLastExpandItem(itemId)
        }
    };

    // When items are expanded
    const handleExpandedItemsChange = (
        event: React.SyntheticEvent,
        itemIds: string[],
    ) => {
        setExpandedItems(itemIds);
    };

    // When 'Expand all' or 'Collapse all' button is clicked
    const handleExpandClick = () => {
        expandedItems.length === 0
            ? setExpandedItems(Object.keys(keyMap))
            : setExpandedItems([])
    }

    // When 'Clear Content' button is clicked
    const handleClearContentClick = () => {
        setLocalJsonData(null);
    }

    // Render element
    return (
        <Container
        sx={{
            padding: '20px',
            marginTop: '20px',
        }}>
            <Typography variant="h4" gutterBottom>
                JSON Data Viewer
            </Typography>

            { localJsonData ? (
                <Paper elevation={3} sx={{
                    padding: '20px',
                    marginTop: '20px',
                    flex: 'auto',
                    flexDirection: 'column',
                }}>
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
                            
                    <Button onClick={handleExpandClick}>
                            {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
                    </Button>
                </Paper>
            ) : null }

            <Paper 
            elevation={3} 
            sx={{
                padding: '20px',
                marginTop: '20px',
            }}>
                {localJsonData ? (
                    <SimpleTreeView 
                    multiSelect={true}
                    checkboxSelection={true}
                    onItemSelectionToggle={handleItemSelectionToggle}
                    onItemExpansionToggle={handleItemExpansionToggle}
                    onExpandedItemsChange={handleExpandedItemsChange}
                    expandedItems={expandedItems}
                    sx = {{
                        textAlign: 'left', 
                        whiteSpace: 'pre-wrap', 
                        wordBreak: 'break-word',
                        fontFamily: 'monospace', 
                        fontSize: '14px' 
                    }}
                    > 
                        {renderJSON(jsonData)} 
                    </SimpleTreeView>
                ) : (
                    <CircularProgress />
                )}
            </Paper>

            { localJsonData ? (
                <Paper 
                elevation={0} 
                sx={{
                    padding: '20px',
                    marginTop: '20px',
                }}>
                    <Button 
                    onClick={handleClearContentClick} 
                    variant="outlined" 
                    color='error'> 
                        Clear Content 
                    </Button>
                </Paper>
            ) : null }
        </Container>
    );
};

export default JSONView;