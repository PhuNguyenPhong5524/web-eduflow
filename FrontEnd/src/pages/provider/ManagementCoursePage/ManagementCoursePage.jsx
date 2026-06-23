import React, { useState, useMemo, useEffect } from 'react';
import { Table, Input, Select, Button, Tag, Popconfirm, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import useLoading from "../../../hooks/useCourse/useLoading";
import { useAuth } from "../../../contexts/AuthContext";
import useGetCourse from '../../../hooks/useCourse/useGetCourse';
import {exportCourseExcel} from '../../../services/adminCourseService';
import BoxAddinfoCourse from './BoxAddinfoCourse/BoxAddinfoCourse';


const ManagementCoursePage = () => {
  // --- Quản lý State Bộ lọc ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  // --- State Quản lý Phân Trang ---
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // --- GỌI API THỰC TẾ QUA HOOK (Từ BoxShowCourse) ---
  // searchQuery được truyền thẳng vào biến keyword của hook để search từ Server
  const {
    data: showCourses,
    isFetching,
    refetch,
  } = useGetCourse(
    page,
    pageSize,
    searchQuery
  );
  const loading = useLoading(isFetching, 300);
  const { user } = useAuth();

  // Tự động đưa về trang 1 khi các bộ lọc thay đổi
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, selectedFeature, selectedPrice]);

  // --- Chức năng Xóa khóa học qua API ---
  // const handleDeleteCourse = async (id) => {
  //   try {
  //     await axios.delete(`/api/courses/${id}`); 
  //     message.success("Xóa khóa học thành công!");
  //     refetch(); // Tải lại danh sách từ server sau khi xóa thành công
  //   } catch (error) {
  //     message.error(error.response?.data?.message || "Xóa khóa học thất bại!");
  //   }
  // };

  // --- Chức năng Làm mới (Reset bộ lọc và gọi lại API) ---
  const handleRefresh = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFeature('All');
    setSelectedPrice('All');
    setPage(1);
    setPageSize(10);
    refetch();
  };

  // --- Logic Bộ lọc kết hợp (Lọc thêm Category/Feature/Price từ dữ liệu Server trả về) ---
  const filteredCourses = useMemo(() => {
    const serverData = showCourses?.data || [];
    return serverData.filter((course) => {
      // Vì searchQuery đã được Server lọc trực tiếp qua hook nên không cần lọc chữ offline nữa
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      
      let matchesFeature = true;
      if (selectedFeature === 'Featured') {
        matchesFeature = course.feature === true;
      } else if (selectedFeature === 'Standard') {
        matchesFeature = course.feature === false;
      }

      let matchesPrice = true;
      if (selectedPrice === 'Free') {
        matchesPrice = course.price === 0;
      } else if (selectedPrice === 'Under 200k') {
        matchesPrice = course.price < 200000;
      } else if (selectedPrice === '200k - 500k') {
        matchesPrice = course.price >= 200000 && course.price <= 500000;
      } else if (selectedPrice === 'Over 500k') {
        matchesPrice = course.price > 500000;
      }

      return matchesCategory && matchesFeature && matchesPrice;
    });
  }, [showCourses, selectedCategory, selectedFeature, selectedPrice]);

  // --- Cấu hình các Cột (Columns) ---
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      className: 'font-label-md text-on-surface-variant text-xs',
      render: (id) => <span title={id}>{id?.substring(0, 8)}...</span>
    },
    {
      title: 'Tên khóa học',
      key: 'courseInfo',
      render: (_, record) => (
        <div className="flex items-center gap-4 group">
          <div className="h-12 w-20 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/20 flex-shrink-0">
            <img 
              className="w-full h-full object-cover" 
              src={record.image_url?.trim()} 
              alt={record.course_title} 
              onError={(e) => { e.target.src = 'https://placehold.co/240x135?text=No+Image'; }}
            />
          </div>
          <div>
            <p className="font-headline-md text-body-md text-on-surface font-bold group-hover:text-primary transition-colors duration-150 m-0">
              {record.course_title}
            </p>
            <p className="text-body-sm text-on-surface-variant m-0">By {record.provider || 'Ẩn danh'}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      className: 'font-body-sm text-on-surface-variant',
      render: (text) => text ? <Tag color="pink">{text}</Tag> : <span className="text-gray-400">---</span>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      className: 'font-label-md text-on-surface font-semibold',
      render: (_, record) => {
        return (
          <span className="text-[#e70000] text-[14px] font-bold">
              { record.price === 0 
                  ? <span className="text-green-400 font-semibold">Free</span>
                  : `${Number(record.price).toLocaleString('vi-VN')}`
              }
          </span>
        ) 
      },
    },
    {
      title: 'Học viên',
      dataIndex: 'students',
      key: 'students',
      align: 'center',
      render: (students) => (
        <div className="inline-flex items-center gap-1 font-label-md text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-primary">person</span>
          {(students || 0).toLocaleString()}
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'feature',
      key: 'feature',
      align: 'center',
      render: (feature) => {
        return feature ? (
          <Tag className="m-0 px-3 py-1 rounded-full text-xs font-label-md bg-orange-100 text-orange-700 border border-orange-200 ant-tag-custom">Featured</Tag>
        ) : (
          <Tag className="m-0 px-3 py-1 rounded-full text-xs font-label-md bg-gray-100 text-gray-600 border border-gray-200 ant-tag-custom">Standard</Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size={4} className="justify-end">          
          {/* Tích hợp thẻ Link router dẫn sang chi tiết giống BoxShowCourse */}
          <Link to={`detail/${record._id}`}>
            <Button type="text" className="p-2 h-auto flex items-center justify-center hover:bg-secondary/10 hover:text-secondary rounded-lg" title="View">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </Button>
          </Link>

          <Popconfirm
            title="Xóa khóa học"
            description="Bạn chắc chắn muốn xóa khóa học này?"
            // onConfirm={() => handleDeleteCourse(record._id)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button type="text" className="p-2 h-auto flex items-center justify-center hover:bg-error/10 hover:text-error rounded-lg" title="Delete">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleExportExcel = async () => {
    try {
      const blob = await exportCourseExcel();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "courses.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      message.success("Xuất file Excel thành công!");
    } catch (error) {
      console.error(error);

      message.error(
        error?.response?.data?.message ||
        "Xuất file Excel thất bại!"
      );
    }
  };

  return (
     <div className="">
        {/* Page Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Quản lý khóa học</h2>
            <p className="text-[12px] mt-1">Quản lý các chương trình học thuật tương thích trực tiếp với hệ thống dữ liệu API.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleRefresh} className="p-2.5 h-auto border border-outline-variant/40 rounded-xl flex items-center justify-center" type="text">
              <span className="material-symbols-outlined text-on-surface-variant">refresh</span>
            </Button>
            <BoxAddinfoCourse 
              refetch={refetch} 
            />
          </div>
        </div>

        {/* Controls / Filters */}
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-wrap items-center gap-4 my-4">
          <div className="flex-grow min-w-[240px]">
            <Input 
              placeholder="Search courses by name, ID or provider..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefix={<span className="material-symbols-outlined text-on-surface-variant/60 mr-1">search</span>}
              className="w-full pl-3 pr-4 py-2 bg-surface border border-outline-variant/40 rounded-xl outline-none font-body-sm transition-all"
              allowClear
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
              className="min-w-[160px]"
              options={[
                { value: 'All', label: 'Category: All' },
                { value: 'Phát triển web', label: 'Phát triển web' },
                { value: 'Khoa học dữ liệu', label: 'Khoa học dữ liệu' },
                { value: 'Ứng dụng di động', label: 'Ứng dụng di động' },
              ]}
            />
            <Select
              value={selectedFeature}
              onChange={(value) => setSelectedFeature(value)}
              className="min-w-[140px]"
              options={[
                { value: 'All', label: 'Type: All' },
                { value: 'Featured', label: 'Featured' },
                { value: 'Standard', label: 'Standard' },
              ]}
            />
            <Select
              value={selectedPrice}
              onChange={(value) => setSelectedPrice(value)}
              className="min-w-[150px]"
              options={[
                { value: 'All', label: 'Price: All' },
                { value: 'Free', label: 'Free' },
                { value: 'Under 200k', label: 'Dưới 200.000đ' },
                { value: '200k - 500k', label: '200k - 500k' },
                { value: 'Over 500k', label: 'Trên 500.000đ' },
              ]}
            />
          </div>
          <Button
            type="primary"
            style={{ height: 'auto', padding: '4px 16px' }}
            onClick={handleExportExcel}
          >
            Xuất file excel
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <Table 
            rowKey="_id"
            columns={columns} 
            dataSource={filteredCourses} 
            loading={loading} // Gắn trạng thái xoay loading chuẩn của hook
            className="w-full"
            rowClassName="hover:bg-surface-container-low/30 transition-colors"
            pagination={{
            current: page,
            pageSize,
            total: showCourses?.totalCourses || 0,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],

            placement: "bottomRight",

            onChange: (p, ps) => {
              setPage(p);
              setPageSize(ps);
            },

            showTotal: (total, range) => (
              <p className="font-body-sm text-on-surface-variant m-0">
                Showing {range[0]} - {range[1]} of {total} courses
              </p>
            ),
            }}
          />
        </div>
      </div>
  );
};

export default ManagementCoursePage;