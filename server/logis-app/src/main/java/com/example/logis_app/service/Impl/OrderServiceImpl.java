package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.OrderMapper;
import com.example.logis_app.model.vo.OrderVO.Item;
import com.example.logis_app.model.vo.OrderVO.Order;
import com.example.logis_app.model.DTO.ProductDTO.ReviewDTO;
import com.example.logis_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
@Transactional
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<Order> getOrderList(Integer userId) {
        //row based hashmap
        List<Map<String, Object>> orderMap = orderMapper.getOrderList(userId);

        Map<String, Order> ordermap = new HashMap<>();

        //Extract into new hashmap
        for (Map<String, Object> item : orderMap) {
            String orderId = (String) item.get("order_id");

            Number cartIdNum = (Number) item.get("cart_id");
            Integer cartId = cartIdNum != null ? cartIdNum.intValue() : null;

            Number itemIdNum = (Number) item.get("item_id");
            Integer itemId = itemIdNum != null ? itemIdNum.intValue() : null;

            Number quantityNum = (Number) item.get("quantity");
            Integer quantity = quantityNum != null ? quantityNum.intValue() : null;

            Number sizeIdNum = (Number) item.get("size_id");
            Integer sizeId = sizeIdNum != null ? sizeIdNum.intValue() : null;

            Number userIdNum = (Number) item.get("user_id");
            Integer userIdFromDB = userIdNum != null ? userIdNum.intValue() : null;

            LocalDateTime placedAt =(LocalDateTime) item.get("placed_at");

            LocalDateTime updatedAt =(LocalDateTime) item.get("updated_at");

            Object statusFromDb = (Object) item.get("status");
            String status = statusFromDb !=null ? statusFromDb.toString() : "";

            Object size = (Object) item.get("size");
            String sizeName = size !=null ? size.toString() : "";

            Object itemNameFromDB = (Object) item.get("item_name");
            String itemName = itemNameFromDB !=null ? itemNameFromDB.toString() : "";

            Item orderItem = new Item(cartId, itemId, quantity, sizeId, itemName, sizeName);

            ordermap.computeIfAbsent(orderId, id -> new Order(id, userIdFromDB, placedAt, updatedAt, status, new ArrayList<>()))
                    .getItems()
                    .add(orderItem);
        }

        List<Order> list = new ArrayList<>(ordermap.values());
        list.sort(Comparator.comparing(Order::getPlacedAt).reversed());
        return list;
    }

    @Override
    public void saveReview(ReviewDTO reviewDTO) {
        //Check Item exist
        Integer commentId = orderMapper.checkItemExist(reviewDTO.getItemId());
        reviewDTO.setCommentId(commentId);

        if (reviewDTO.getCommentId() != null) {
            //update comment number
            orderMapper.updateItemCommentCount(reviewDTO.getItemId());
        } else {
            //Create new comment
            orderMapper.insertItemCommentIfNotExists(reviewDTO);
        }

        if (reviewDTO.getParent() == null) {
            //increase max parent comment
            Integer maxParent = orderMapper.findMaxParent(reviewDTO.getItemId());
            reviewDTO.setParent((maxParent == null) ? 1 : maxParent + 1);
            reviewDTO.setRoot(0);
        } else {
            //increase root comment
            Integer maxRoot = orderMapper.findMaxRoot(reviewDTO.getItemId(), reviewDTO.getParent());
            System.out.println("Max Root Retrieved: " + maxRoot);
            reviewDTO.setRoot((maxRoot == null || maxRoot == 0) ? 1 : maxRoot + 1);
        }

        //Get auto generated index id
        orderMapper.insertItemCommentIndex(reviewDTO);

        //Insert review details
        orderMapper.insertReviewDetails(reviewDTO);

        reviewDTO.setCreateTime(LocalDateTime.now());
        //Store comment message
        orderMapper.storeComment(reviewDTO);
    }

}
