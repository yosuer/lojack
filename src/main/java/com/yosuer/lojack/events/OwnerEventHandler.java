package com.yosuer.lojack.events;

import static com.yosuer.lojack.config.WebSocketConfiguration.MESSAGE_PREFIX;
import org.springframework.data.rest.core.annotation.*;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.yosuer.lojack.domain.Manager;
import com.yosuer.lojack.domain.Owner;
import com.yosuer.lojack.repository.ManagerRepository;

@Component
@RepositoryEventHandler(Owner.class)
public class OwnerEventHandler {

	private final SimpMessagingTemplate webSocket;
	private final EntityLinks entityLinks;
	private final ManagerRepository managerRepository;

	public OwnerEventHandler(SimpMessagingTemplate webSocket, EntityLinks entityLinks,
			ManagerRepository managerRepository) {
		this.webSocket = webSocket;
		this.entityLinks = entityLinks;
		this.managerRepository = managerRepository;
	}

	@HandleBeforeCreate
	public void applyUserInformationUsingSecurityContext(Owner owner) {
		String managerName = SecurityContextHolder.getContext().getAuthentication().getName();
		Manager manager = this.managerRepository.findByName(managerName);
		if(manager == null) {
			Manager newManager = new Manager();
			newManager.setName(managerName);
			newManager.setRoles(new String[]{"ROLE_MANAGER"});
			manager = this.managerRepository.save(newManager);
		}
		owner.setManager(manager);
	}

	@HandleAfterCreate
	public void newOwner(Owner owner) {
		this.webSocket.convertAndSend(
				MESSAGE_PREFIX + "/newOwner", getPath(owner));
	}

	@HandleAfterDelete
	public void deleteOwner(Owner owner) {
		this.webSocket.convertAndSend(
				MESSAGE_PREFIX + "/deleteOwner", getPath(owner));
	}

	@HandleAfterSave
	public void updateOwner(Owner owner) {
		this.webSocket.convertAndSend(
				MESSAGE_PREFIX + "/updateOwner", getPath(owner));
	}

	/**
	 * Take an {@link Owner} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param owner
	 */
	private String getPath(Owner owner) {
		return this.entityLinks
				.linkForSingleResource(owner.getClass(), owner.getId())
				.toUri()
				.getPath();
	}
}
