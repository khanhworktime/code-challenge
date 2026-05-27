### Problem of the Messy React

## Assumtion:

- Due to the lack of importations, I will assume that the import was correct and ignore all the errors of import could make.
- Some variables was not define or not clear meaning, I will give them meaning due to the context.

## Problem:

- Line 5: The FormattedWalletBalance should be extended from the WalletBalance.
- Line 11: The interface of Props was extra, should not be interface if no extends will be added, considering using the BoxProps directly or using Type
- Line 17: This function was isolated to the current components, considering move them outside the component to prevent re-defined. Or move them to constants for universal.
- Line 19 - 30: The order in number may reuse, considering change them to Enum and store with meanful name.
- Line 36: Show seperate the logic here to other variable for a clean logic.
- Line 38: the lhsPriority was not defined and the blockchain was not in the WalletBalance object.
- Line 38 - 42: Should use the false break than the true break. Change the perspective of the criteria for clearer mean.
- Line 45 - 52: The else side wasn't necessary, simplify it.
- Line 54: The prices dependency should be remove, cause not used in the useMemo's callback. The balances is an array, should not using as dependency item, require jsonify to make it stay.
- Line 56: This function wasn't used in this component.
- Line 63: The rows was a list of components, should be wrapped with useMemo with the sortedBalances jsonified as dependency.
- Line 68: Assume that we are using some module css styling here, I'll let it stay.
- Line 69: The index shouldn't used as a key. Using the balance.blockchain or any ID related, I'll assume that this is a web3 wallet, we should use chainID for rendering key.
- Line 72: Apply the formatted logic here.
- Line 78: We just need the spread of ...rest, considering config the type at line 11 Omit the children then just using the props.
- Final: This is a page component, we're missing the default export.

## The fix that I apply:

- Add the blockchain props to WalletBalance

- Update the FormattedWalletBalance to extend the WalletBalance + formatted props

- Add EPriority for universal purpose

- Move the getPriority function outside the component

- Compress the transform logic (Filter, Sort and Add formattedAmount) to a transform function stay outside of the component

- Jsonify the balances' name for the dependency purpose

- Create a displayBalance wrapped with useMemo

- Using the displayBalance for the rows children.

- Add the default export for the page component.
