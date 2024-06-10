"use client";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Collapse } from "@mui/material";
import List from "@mui/material/List";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FontSize } from "../../core/lib/style";

export interface MenuGroupProps {
    name: string,
    icon: React.ReactNode,
    path: string,
    children?: any
}

// @ts-ignore
export function createMenu (
    name: string,
    icon: React.ReactNode,
    path: string,
    children?: MenuGroupProps[]
) {
    return {name, icon, path, children};
}


export function MenuGroup(props: { item: MenuGroupProps, key: number }) {
	const router = useRouter();
	const path = usePathname();
	const { item } = props;
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (item.children) {
			item.children.forEach((child: MenuGroupProps) => {
				if (path === child.path) {
					setOpen(true);
				}
			});
		}
	}, [item.children, open, path]);

	return !item.children ? (
		<ListItemButton
			selected={path === item.path}
			sx={{ borderRadius: 2 }}
			onClick={() => {
				router.push(item.path);
			}}>
			<ListItemIcon>
				{item.icon}
			</ListItemIcon>
			<ListItemText primary={item.name} primaryTypographyProps={{fontSize: FontSize.medium}} />
		</ListItemButton>
	) : (
		<Box>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>
					{item.icon}
				</ListItemIcon>
				<ListItemText primary={item.name} primaryTypographyProps={{fontSize: FontSize.medium}} />
				{open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
			</ListItemButton>
			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit>
				<List
					sx={{
						paddingLeft: 4,
					}}>
					{item.children.map((child: any, index: number) => (
						<MenuGroup
							item={child}
							key={index}></MenuGroup>
					))}
				</List>
			</Collapse>
		</Box>
	);
}
