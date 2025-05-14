import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import React, { useEffect } from "react";
import {
  fetchSellerOrders,
  updateSellerOrders,
} from "../../../state/seller/sellerOrderSlice";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  OrderOrderStatusEnum,
  UpdateOrderHandlerOrderStatusEnum,
} from "../../../api/generated-fetch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const sellerOrderState = useAppSelector((s) => s.sellerOrder);

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("token") || ""));
  }, [dispatch]);

  const [anchorElMap, setAnchorElMap] = React.useState<Record<
    number,
    HTMLElement
  > | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    orderId: number
  ) => {
    setAnchorElMap((prev) => ({
      ...(prev || {}),
      [orderId]: event.currentTarget,
    }));
  };

  const handleClose = (orderId: number, value: OrderOrderStatusEnum) => {
    setAnchorElMap(null);
    console.log("pressed: " + value);

    dispatch(
      updateSellerOrders({
        jwt: localStorage.getItem("token") || "",
        orderId: orderId,
        orderStatus: value,
      })
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell>Shipping Address</StyledTableCell>
            <StyledTableCell>Order Status</StyledTableCell>
            <StyledTableCell>Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrderState.orders.map((order) => {
            const currentOrderAnchorEl = anchorElMap
              ? anchorElMap[order.id!]
              : null;
            const isMenuOpenForThisRow = Boolean(currentOrderAnchorEl);

            return (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  {order.id}
                </StyledTableCell>
                <StyledTableCell className="flex gap-1 flex-wrap">
                  {order.orderItems?.map((orderItem, index) => (
                    <div
                      className="flex gap-5"
                      key={
                        orderItem.product?.id ||
                        orderItem.id ||
                        `orderItem-${index}`
                      }
                    >
                      <img
                        className="w-20 rounded-md"
                        src={orderItem.product?.images![0]}
                        alt={orderItem.product?.title || "Product image"}
                      />
                      <div className="flex flex-col justify-between">
                        <h1>Title: {orderItem.product?.title}</h1>
                        <h1>
                          Selling Price: {orderItem.product?.sellingPrice}
                        </h1>
                        <h1>Color: {orderItem.product?.color}</h1>
                      </div>
                    </div>
                  ))}
                </StyledTableCell>
                <StyledTableCell>
                  <div className="flex flex-col space-y-2">
                    <h1>{order.shippingAddress?.name}</h1>
                    <h1>
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}
                    </h1>
                    <h1>
                      {order.shippingAddress?.state} -{" "}
                      {order.shippingAddress?.pinCode}
                    </h1>
                    <h1>
                      <strong>Mobile:</strong> {order.shippingAddress?.mobile}
                    </h1>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="px-5 py-2 border rounded-full text-primary-color border-primary-color">
                    {order.orderStatus}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      id={`basic-button-${order.id!}`}
                      aria-controls={
                        isMenuOpenForThisRow
                          ? `basic-menu-${order.id!}`
                          : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={isMenuOpenForThisRow ? "true" : undefined}
                      onClick={(e) => handleClick(e, order.id!)}
                    >
                      CHANGE
                    </Button>
                    <Menu
                      id={`basic-menu-${order.id!}`}
                      anchorEl={currentOrderAnchorEl}
                      open={isMenuOpenForThisRow}
                      MenuListProps={{
                        "aria-labelledby": `basic-button-${order.id!}`,
                      }}
                    >
                      {Object.values(UpdateOrderHandlerOrderStatusEnum).map(
                        (value) => (
                          <MenuItem
                            key={value}
                            onClick={() => handleClose(order.id!, value)}
                          >
                            {value}
                          </MenuItem>
                        )
                      )}
                    </Menu>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
